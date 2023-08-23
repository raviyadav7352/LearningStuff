import React, { useState, useEffect } from 'react';
import './MyAssessment.css'
import { listAll, ref, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';
import { storage } from '../firebase.js';
import { usePdfContext } from '../context/PdfContext';
import DynamicSVG from './DynamicSVG.jsx';
import PdfViewer from './PdfViewer';
import DeleteYesModal from './DeleteYesModal';
import MyAssessment from './MyAssessment';

const PdfList = () => {
  const { pdfUrls, setPdfUrls, setPdfUrlData } = usePdfContext();
  const [pdfs, setPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfToDelete, setPdfToDelete] = useState(null);


  useEffect(() => {
    const pdfsStorageRef = ref(storage, 'educare');
    listAll(pdfsStorageRef)
      .then(async (result) => {
        const pdfUrlPromises = result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const name = extractPdfNameFromPath(item.fullPath);
          return { url, name, ref: item };
        });

        Promise.all(pdfUrlPromises)
          .then(async (pdfs) => {
            const pdfsWithMetadata = await Promise.all(
              pdfs.map(async (pdf) => {
                const metadata = await getMetadata(pdf.ref);
                const sizeInMB = (metadata.size / (1024 * 1024)).toFixed(2);
                let sizeFormatted;
                if (sizeInMB < 1) {
                  const sizeInKB = (metadata.size / 1024).toFixed(2);
                  sizeFormatted = `${sizeInKB} KB`;
                } else {
                  sizeFormatted = `${sizeInMB} MB`;
                }
                const currentDate = new Date(metadata.timeCreated);
                const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
                return { ...pdf, sizeFormatted, creationDate: formattedDate };
              })
            );

            setPdfs(pdfsWithMetadata);
            setPdfUrlData(pdfsWithMetadata);
            setPdfUrls(false);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error getting PDF URLs:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error listing PDFs:', error);
        setIsLoading(false);
      });
  }, [pdfUrls]);

  // const handleDeletePdf = async (pdfRef) => {
  //   try {
  //     await deleteObject(pdfRef);
  //     setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.ref !== pdfRef));
  //   } catch (error) {
  //     console.error('Error deleting PDF:', error);
  //   }
  // };

  const extractPdfNameFromPath = (path) => {
    const pathParts = path.split('/');
    return pathParts[pathParts.length - 1];
  };
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const handlePdfViewerOpen = () => {
    setIsPdfViewerOpen(true);
  };

  const handlePdfViewerClose = () => {
    setIsPdfViewerOpen(false);
  };
  const handleDeletePdf = async (pdfRef) => {
    try {
      await deleteObject(pdfRef);
      setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.ref !== pdfRef));
      setIsModalOpen(false); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };
  return (
    <>
    
      {pdfs.map((pdfdata, index) => (
        <div key={index} className="my-assessment-wrapper p16 borderR12 border1 overf-H">

          <div className="my-assessment-header pos-rel">
            <div className="list-icon flexM">
              <span className="material-symbols-outlined color-theme">
                picture_as_pdf
              </span>
            </div>

            <div className="more-icon pos-abs cur flexM">
              <button className="u-btn u-btn-borderless" onClick={() => {
                setPdfToDelete(pdfdata);
                setIsModalOpen(true);
              }}>
                <span className="material-symbols-outlined color-failed fw-500">
                  Delete
                </span>
              </button>
            </div>
            <div className="mT10 sm-mT0">
              <h4 className="color-theme fs18 fw-500 ellipsis">{pdfdata.name.replace(/\.pdf|-$/, '')}</h4>
              <div className="flexC gap10 sm-gap5">
                <p className="color-theme fs14 fW-bold">education</p>
                <DynamicSVG svgName='vertLine' />
                <div className="flexC gap5">
                  <div className="sm-dN"><DynamicSVG svgName='calender' /></div>
                  <div className="dN sm-block"><DynamicSVG svgName='clock' /></div>
                  <span className="color-info fs12 fw-500">{pdfdata.creationTime}</span>
                </div>
              </div>
            </div>
            {/* <div className="flex gap14">
            <div className="color-theme fs14">
              <p>{pdfdata.sizeInMB} MB</p>
              <p className="fs12">File Size</p>
            </div>
            <div className="color-theme fs14">
              <p>{pdfdata.creationTime}</p>
              <p className="fs12">Date</p>
            </div>
          </div> */}
          </div>
          <div className="dashed-hor-line mY16"></div>
          <div className="my-assessment-footer flex justifySB">
            <div className="flexC gap5 ">
              {/* <div className="color-theme fs14">
                        <p className="">{pdfdata.name}</p>
                        <p className="fs12">Duration</p>
                    </div> */}
              <span className="material-symbols-outlined fs20 color-theme">memory</span>
              <p className='fs12 fw-500 color-info'>{pdfdata.sizeFormatted}</p>
              {/* <p className="fs12">File Size</p> */}
            </div>
            <div className="flexC gap10">
              <div className="hover"><span>Share<i className="fa fa-share mL10"></i>  </span>
                <a className="social-link" href="https://twitter.com/twitter" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="social-link" href={`whatsapp://send?text=Check%20out%20this%20PDF%20link:%20[${pdfdata.url}]`} target="_blank"><i className="fab fa-whatsapp"></i>
                </a>
                <a className="social-link" href="https://www.instagram.com/joshuaward/" target="_blank"><i className="fab fa-instagram"></i>
                </a>
                <a className="social-link" href="https://github.com/joshuaward" target="_blank"><i className="fab fa-github"></i>
                </a>
              </div>

              <div className="share-box color-theme fs14 fw-500 cur">

               
                <a href={pdfdata.url} target="_blank" rel="noopener noreferrer">
                <button className='u-btn u-btn-borderless'>Open PDF</button>
              </a>
              </div>
                  
            </div>
          </div>
        </div>
      ))}
      {/* <h2>List of Uploaded PDFs</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index}>
              <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                {pdf.name}
              </a>
              <button onClick={() => handleDeletePdf(pdf.ref)}>Delete</button>
            </li>
          ))}
        </ul>
      )} */}
        <DeleteYesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeletePdf}
        pdfToDelete={pdfToDelete}
      />
    </>
  );
};

export default PdfList;
