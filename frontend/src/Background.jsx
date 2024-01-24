import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { Card } from './Card';
import axios from 'axios';


export const Background = () => {
  const date = new Date();
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [file, setFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [sesTemplateNames, setSESTemplateNames] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [showFloat, setShowFloat] = useState(false);
  const [SendMail, setSendMail] = useState(false);
  const [ViewMode, setViewMode] = useState('base');
  const fileReportInputRef = useRef(null);
  const fileDocumentInputRef = useRef(null);
  const [filterTemplateData, setfilterTemplateData] = useState([templates ])
  const [filter, setfilter] = useState(false)
  

  const handleReportButtonClick = () => {
    // Trigger the click event on the hidden file input
    fileReportInputRef.current.click();
  };

  const handleDocumentButtonClick = () => {
    fileDocumentInputRef.current.click();
  };

  const handleFileReportChange = (e) => {
    const selectedFile = e.target.files[0];
    setExcelFile(selectedFile)
  };

  const handleFileDocumentChange = (e) => {
    const selectedFile = e.target.files[0];
    setAttachmentFile(selectedFile)
  };

  useEffect(() => {
    const fetchTemplateNames = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/fetch_email_templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching email templates:', error);
      }
    };

    fetchTemplateNames();

    const fetchSESTemplates = async () => {
      try {
        const names = await fetchSESTemplateNames();
        console.log('Fetched SES Template Names:', names);

        if (names.length > 0) {
          setSESTemplateNames(names);
          // Set the selected template if it's not already set
          if (!selectedTemplate && names[0]) {
            setSelectedTemplate(' ');
          }
        } else {
          // Handle the case where no SES templates are available
          console.error('No SES templates available.');
        }
      } catch (error) {
        console.error('Error fetching SES templates:', error);
      }
    };

    fetchSESTemplates();
  }, [selectedTemplate]);

  const fetchSESTemplateNames = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/fetch_email_templates');
      const templateNames = response.data || [];
      console.log('Fetched SES Template Names:', templateNames);
      return templateNames;
    } catch (error) {
      console.error('Error fetching SES template names:', error);
      return []; // Return an empty array on error
    }
  };

  const handlePreview = async () => {
    try {
      const formData = new FormData();
      formData.append('template_name', selectedTemplate);
      formData.append('excel_file', excelFile, excelFile.name);

      const response = await axios.post('http://127.0.0.1:8000/preview_email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      setPreviewData(response.data);
      setViewMode('preview')
    } catch (error) {
      console.error('Error previewing emails:', error);
      alert('Failed to preview emails. Please check the console for details.');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleToggle = () => {
    setShowFloat(!showFloat);
  };
  const Mail = () => {
    setSendMail(!SendMail);
  };

  const handleCreateTemplate = async () => {
    try {
      const formData = new FormData();
      formData.append('template_name', templateName);
      formData.append('html_template', file, file.name); // Append the file with its name

      const response = await axios.post('http://127.0.0.1:8000/create_template', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // You can handle the response as needed


      // Clear the input fields
      setTemplateName('');
      setFile(null);
      window.location.reload();

      // Display success alert
      alert('Template created successfully!');
    } catch (error) {
      console.error('Error creating email template:', error);

      // Display error alert
      alert('Failed to create template. Please try again.');
    } finally {
      // Close the div by setting showFloat to false
      setShowFloat(false);
    }
  };


  const handleSendBulkEmails = async () => {
    try {
      const templateNames = await fetchSESTemplateNames();

      if (!templateNames.includes(selectedTemplate)) {
        alert(`Selected SES template '${selectedTemplate}' not found.`);
        return;
      }

      const formData = new FormData();
      formData.append('template_name', selectedTemplate);
      formData.append('excel_file', excelFile, excelFile.name);

      if (attachmentFile) {
        formData.append('attachment', attachmentFile, attachmentFile.name);
      }

      const response = await axios.post('http://127.0.0.1:8000/send_bulk_emails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Bulk emails sent successfully!');
    } catch (error) {
      console.error('Error sending bulk emails:', error);

      if (error.response && error.response.status === 422) {
        console.error('Unprocessable Entity. Check the request data:', error.response.data);
      }

      alert('Failed to send bulk emails. Please check the console for details.');
    }
  };

  const SearchThroughTemplate =(searchString) =>{
    
    const lowerSearchString = searchString.toLowerCase();

    const filteredTemplate = templates.filter((payload) => {    
      return payload.toLowerCase().includes(lowerSearchString);
    });

    console.log(filteredTemplate)
    setfilter(true);
    setfilterTemplateData(filteredTemplate)
    console.log(templates);
  
  }



  return (
    <>
      <div className={`float ${showFloat ? "visible" : ""}`}>
        <div className="Heading-Template">
          <h1>Create Template</h1>
        </div>
        <div className="text">
          <input
            type="text"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
        <div className="file">
          <input type="file" accept=".html" onChange={handleFileChange} />
        </div>

        <div className="button">
          <button className="cancel" onClick={handleToggle}>
            Cancel
          </button>
          <button className="createtemp" onClick={handleCreateTemplate}>
            Submit
          </button>
        </div>
      </div>

      <div className={`background ${showFloat ? "body-blur" : ""}`}>
        <div className="top">
          <div className="top">
            <div className="search1">
              <input
                className="search"
                type="search"
                onChange={(e) => SearchThroughTemplate(e.target.value)}
                placeholder="Search Templates"
              />
            </div>
            <div className="right">
              <div className="attachment">
                <a href="#">
                  <svg
                    onClick={handleToggle}
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 32 33"
                    fill="none"
                  >
                    <path
                      d="M17.6 14.85V8.25H14.4V14.85H8V18.15H14.4V24.75H17.6V18.15H24V14.85H17.6ZM16 33C11.7565 33 7.68687 31.2616 4.68629 28.1673C1.68571 25.0729 0 20.8761 0 16.5C0 12.1239 1.68571 7.92709 4.68629 4.83274C7.68687 1.73839 11.7565 0 16 0C20.2435 0 24.3131 1.73839 27.3137 4.83274C30.3143 7.92709 32 12.1239 32 16.5C32 20.8761 30.3143 25.0729 27.3137 28.1673C24.3131 31.2616 20.2435 33 16 33Z"
                      fill="#3D63F7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main-wrap">
          <div className="card-flex">
            {filter? filterTemplateData.map((template) =>(
               <Card
               key={template}
               template={template}
               setTemplates={setTemplates}
               handleSelectTemplate={setSelectedTemplate}
               selectedCard={selectedTemplate}
             />
            )) :
             templates.map((template) => (
              <Card
                key={template}
                template={template}
                setTemplates={setTemplates}
                handleSelectTemplate={setSelectedTemplate}
                selectedCard={selectedTemplate}
              />
            ))}
          </div>
          <div className="preview">
            <div className="top-preview">
              <div className="previewtitle">
                <h1>Preview</h1>
                <p className='temp-name'>Selected Template: {selectedTemplate}</p>
              </div>
              <div className="button-wrapper">
                <span className="upload">
                  <button onClick={handleReportButtonClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M15.2976 11.9922L6.6499 10.4688V21.7258C6.65 21.8481 6.67419 21.9692 6.72109 22.0821C6.76798 22.195 6.83666 22.2976 6.92321 22.384C7.00976 22.4704 7.11248 22.539 7.2255 22.5857C7.33852 22.6324 7.45964 22.6564 7.58193 22.6563H22.5038C22.6262 22.6566 22.7475 22.6327 22.8607 22.5861C22.9739 22.5395 23.0768 22.471 23.1635 22.3846C23.2503 22.2982 23.3191 22.1955 23.3661 22.0825C23.4131 21.9694 23.4373 21.8482 23.4374 21.7258V17.5781L15.2976 11.9922Z"
                        fill="#185C37"
                      />
                      <path
                        d="M15.2976 2.34375H7.58193C7.45964 2.34365 7.33852 2.36763 7.2255 2.41434C7.11248 2.46104 7.00976 2.52955 6.92321 2.61595C6.83666 2.70236 6.76798 2.80496 6.72109 2.9179C6.67419 3.03085 6.65 3.15193 6.6499 3.27422V7.42188L15.2976 12.5L19.8765 14.0234L23.4374 12.5V7.42188L15.2976 2.34375Z"
                        fill="#21A366"
                      />
                      <path
                        d="M6.6499 7.42188H15.2976V12.5H6.6499V7.42188Z"
                        fill="#107C41"
                      />
                      <path
                        opacity="0.1"
                        d="M12.839 6.40625H6.6499V19.1016H12.839C13.0856 19.1003 13.3218 19.002 13.4964 18.8278C13.671 18.6537 13.7699 18.4177 13.7718 18.1711V7.33672C13.7699 7.09011 13.671 6.85416 13.4964 6.67999C13.3218 6.50583 13.0856 6.40748 12.839 6.40625Z"
                        fill="black"
                      />
                      <path
                        opacity="0.2"
                        d="M12.3304 6.91406H6.6499V19.6094H12.3304C12.577 19.6081 12.8132 19.5098 12.9878 19.3356C13.1624 19.1615 13.2613 18.9255 13.2632 18.6789V7.84453C13.2613 7.59792 13.1624 7.36197 12.9878 7.18781C12.8132 7.01364 12.577 6.91529 12.3304 6.91406Z"
                        fill="black"
                      />
                      <path
                        opacity="0.2"
                        d="M12.3304 6.91406H6.6499V18.5937H12.3304C12.577 18.5925 12.8132 18.4942 12.9878 18.32C13.1624 18.1458 13.2613 17.9099 13.2632 17.6633V7.84453C13.2613 7.59792 13.1624 7.36197 12.9878 7.18781C12.8132 7.01364 12.577 6.91529 12.3304 6.91406Z"
                        fill="black"
                      />
                      <path
                        opacity="0.2"
                        d="M11.8218 6.91406H6.6499V18.5937H11.8218C12.0684 18.5925 12.3046 18.4942 12.4792 18.32C12.6538 18.1458 12.7527 17.9099 12.7546 17.6633V7.84453C12.7527 7.59792 12.6538 7.36197 12.4792 7.18781C12.3046 7.01364 12.0684 6.91529 11.8218 6.91406Z"
                        fill="black"
                      />
                      <path
                        d="M2.49531 6.91406H11.8219C12.0689 6.91386 12.306 7.01175 12.4809 7.18622C12.6558 7.36069 12.7543 7.59748 12.7547 7.84453V17.1555C12.7543 17.4025 12.6558 17.6393 12.4809 17.8138C12.306 17.9883 12.0689 18.0861 11.8219 18.0859H2.49531C2.37295 18.0861 2.25175 18.0622 2.13864 18.0156C2.02553 17.9689 1.92272 17.9004 1.83609 17.814C1.74946 17.7276 1.6807 17.625 1.63376 17.512C1.58682 17.399 1.5626 17.2778 1.5625 17.1555V7.84453C1.5626 7.72217 1.58682 7.60103 1.63376 7.48804C1.6807 7.37504 1.74946 7.2724 1.83609 7.18599C1.92272 7.09958 2.02553 7.03109 2.13864 6.98443C2.25175 6.93777 2.37295 6.91386 2.49531 6.91406Z"
                        fill="url(#paint0_linear_634_10)"
                      />
                      <path
                        d="M4.45312 15.5258L6.41484 12.4914L4.61797 9.47424H6.06094L7.04141 11.4063C7.13203 11.5891 7.19766 11.725 7.22734 11.8156H7.24062C7.30469 11.6688 7.37266 11.5274 7.44375 11.3891L8.49219 9.47737H9.82031L7.97734 12.4774L9.86719 15.5281H8.45391L7.32109 13.4102C7.2685 13.3191 7.2238 13.2237 7.1875 13.125H7.16875C7.13572 13.2212 7.09168 13.3132 7.0375 13.3992L5.87109 15.5258H4.45312Z"
                        fill="white"
                      />
                      <path
                        d="M22.5049 2.34375H15.2979V7.42188H23.4377V3.27422C23.4376 3.15186 23.4134 3.03072 23.3664 2.91772C23.3195 2.80473 23.2507 2.70209 23.1641 2.61568C23.0775 2.52927 22.9747 2.46077 22.8616 2.41411C22.7484 2.36746 22.6272 2.34355 22.5049 2.34375Z"
                        fill="#33C481"
                      />
                      <path
                        d="M15.2979 12.5H23.4377V17.5781H15.2979V12.5Z"
                        fill="#107C41"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_634_10"
                          x1="3.51094"
                          y1="6.18281"
                          x2="10.8062"
                          y2="18.8172"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#18884F" />
                          <stop offset="0.5" stop-color="#393939" />
                          <stop offset="1" stop-color="#0B6631" />
                        </linearGradient>
                      </defs>
                    </svg>
             
                  </button>
                  {excelFile && <p>{excelFile.name}</p>}
                </span>

                <span className="upload">
                  <button title="Upload Attachment" onClick={handleDocumentButtonClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M10 9V14C10 14.5304 10.2107 15.0391 10.5858 15.4142C10.9609 15.7893 11.4696 16 12 16C12.5304 16 13.0391 15.7893 13.4142 15.4142C13.7893 15.0391 14 14.5304 14 14V7C14 5.93913 13.5786 4.92172 12.8284 4.17157C12.0783 3.42143 11.0609 3 10 3C8.93913 3 7.92172 3.42143 7.17157 4.17157C6.42143 4.92172 6 5.93913 6 7V15C6 16.5913 6.63214 18.1174 7.75736 19.2426C8.88258 20.3679 10.4087 21 12 21C13.5913 21 15.1174 20.3679 16.2426 19.2426C17.3679 18.1174 18 16.5913 18 15V5"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                 
                  </button>
                  {attachmentFile && <p>{attachmentFile.name}</p>}
                </span>
      
                <span className="preview-button">
                  <button onClick={handlePreview}>Preview</button>
                </span>

                <div className='sendmail send'>
                  {ViewMode === 'preview' && <button onClick={handleSendBulkEmails}>Send</button>}
                  <input
                    type="file"
                    ref={fileReportInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileReportChange}
                  />
                  <input
                    type="file"
                    ref={fileDocumentInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileDocumentChange}
                  />
                </div>
              </div>
            </div>
            {previewData && (
                <div className="preview-section">
                  <h2>Email Preview</h2>
                  <div dangerouslySetInnerHTML={{ __html: previewData.rendered_template }} />
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
