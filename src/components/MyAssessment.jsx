import React, { useState } from "react";
import './MyAssessment.css'
import DynamicSVG from "./DynamicSVG";
import PdfViewer from "./PdfViewer";

const MyAssessment = ({ pdfdata }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

    const handlePdfViewerOpen = () => {
        setIsPdfViewerOpen(true);
    };

    const handlePdfViewerClose = () => {
        setIsPdfViewerOpen(false);
    };
    const pdfUrl = 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf';
    const handleMoreMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="my-assessment-wrapper p16 borderR12 border1">
            <div className="my-assessment-header pos-rel">
                <DynamicSVG svgName={'job'} />
                <div className="more-icon pos-abs cur flexM" onClick={handleMoreMenu}>
                    <DynamicSVG svgName='threeDot' />
                    
                </div>
                <div className="mT10 sm-mT0">
                    <h4 className="color-theme fs18 fw-500 ellipsis">{pdfdata.name}</h4>
                    <div className="flexC gap10 sm-gap5">
                        <p className="color-theme fs14 fW-bold">education</p>
                        <DynamicSVG svgName='vertLine' />
                        <div className="flexC gap5">
                            <div className="sm-dN"><DynamicSVG svgName='calender' /></div>
                            <div className="dN sm-block"><DynamicSVG svgName='clock' /></div>
                            <span className="color-info fs12 fw-500">12 aug 2023</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashed-hor-line mY16"></div>
            <div className="my-assessment-footer flex justifySB">
                <div className="flex gap14">
                    {/* <div className="color-theme fs14">
                        <p className="">{pdfdata.name}</p>
                        <p className="fs12">Duration</p>
                    </div> */}
                    <div className="color-theme fs14">
                        <p>3</p>
                        <p className="fs12">Pages</p>
                    </div>
                </div>
                <div className="flexC gap10">
                    <div className="hover"><span>Share<i className="fa fa-share mL10"></i>  </span>
                        <a className="social-link" href="https://twitter.com/twitter" target="_blank">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="social-link"href={`whatsapp://send?text=Check%20out%20this%20PDF%20link:%20[${pdfdata.url}]`} target="_blank"><i className="fab fa-whatsapp"></i>
                        </a>
                        <a className="social-link" href="https://www.instagram.com/joshuaward/" target="_blank"><i className="fab fa-instagram"></i>
                        </a>
                        <a className="social-link" href="https://github.com/joshuaward" target="_blank"><i className="fab fa-github"></i>
                        </a>
                    </div>
                    
                    <div className="share-box color-theme fs14 fw-500 cur">
                    {/* <DynamicSVG svgName='share' /> */}

                <button className='u-btn u-btn-borderless' onClick={handlePdfViewerOpen}>Open PDF</button>
            <PdfViewer pdfUrl={pdfdata.url} isOpen={isPdfViewerOpen} onClose={handlePdfViewerClose} />
            {/* {isPdfViewerOpen && <PdfViewer pdfUrl={pdfUrl} onClose={handlePdfViewer/Close} />} */}
                                </div>
                    {/* <div className="avatar-body dN">
                        {pdfdata.users.map((user, i) => (
                            <div
                                className="avatar "
                                key={i}
                                style={{
                                    zIndex: pdfdata.users.length + i,
                                    marginLeft: i === 0 ? 0 : "-15px",
                                }}
                            >{user.user}</div>
                        ))}
                    </div> */}
                    {/* {pdfdata.userCount  && <p className="fs12 fW-bold color-theme">+{pdfdata.userCount}</p>} */}
                </div>
            </div>
        </div>
    );
};

export default MyAssessment;
