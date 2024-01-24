import React, { useState} from 'react';
import { Link } from "react-router-dom";
import "./App.css";
import axios
 from "axios";
export const Card = ({ template, setTemplates, handleSelectTemplate , selectedCard}) => {
  
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    handleSelectTemplate(template);
  };

  const handleDeleteTemplate = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete_template/${template}`);
      console.log(response.data);
  
      // After deleting the template, fetch the updated list of templates
      const updatedTemplates = await axios.get('http://127.0.0.1:8000/fetch_email_templates');
      setTemplates(updatedTemplates.data);
  
      // Display success alert
      alert(`Template '${template}' deleted successfully!`);
  
      // Clear the selected template
      // setSelectedTemplate('');
    } catch (error) {
      console.error('Error deleting email template:', error);
  
      // Display error alert
      alert('Failed to delete template. Please try again.');
    }
  };

  const handleDownloadFile = async () => {
      try{
        const downloadTemplate = await axios.post('http://127.0.0.1:8000/download',{},{params:{template_name:template},responseType:'arraybuffer'});
        const fileData = downloadTemplate.data;

        const blob = new Blob([fileData]);

        // Create a temporary link element
        const link = document.createElement('a');

        // Set the href attribute of the link to a URL representing the Blob
        link.href = URL.createObjectURL(blob);

        // Specify the name of the file to be downloaded
        link.download = `${template}.xlsx`;

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click event on the link to initiate the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      }catch(err){
        console.log(err)
        alert('error occured while downloading the file')
      }
  }
  return (

  <div className="card" onClick={toggleSelection} style={selectedCard === template ?  {backgroundColor:'#dff0fb'}:{}}>
      <div className="text-card">
        <h1>{template}</h1>
        <p className="timestamp">Created At: 12/2/2002</p>
        <div>
        <div className="edit">
          <div className="Ready">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="6.5" fill="#1BC869" />
            </svg>
            <span className="textready">
              <a onClick={handleDownloadFile}>Download Excel</a>

            </span>
          </div>
          <div className="right-ready">
          
              <svg onClick={handleDeleteTemplate} title='Delete Template'
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_528_132)">
                  <path
                    d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM16.997 7H7.003L7.931 20H16.069L16.997 7ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z"
                    fill="#FF0101"
                    fill-opacity="0.6"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_528_132">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              
            <Link to={`/editpage/${template}`} title="EditTemplate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.4549 5.41601C21.5499 5.56022 21.5922 5.7328 21.5747 5.9046C21.5573 6.0764 21.481 6.23691 21.3589 6.35901L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7784 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.3431 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.11109 11.8881 8.16616 11.7814 8.24289 11.691L17.4699 2.47001C17.6105 2.32956 17.8011 2.25067 17.9999 2.25067C18.1986 2.25067 18.3893 2.32956 18.5299 2.47001L21.3589 5.29801C21.3948 5.33402 21.4269 5.37355 21.4549 5.41601ZM19.7679 5.82801L17.9999 4.06101L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.82801Z"
                  fill="#222222"
                />
                <path
                  d="M19.6411 17.16C19.9144 14.824 20.0017 12.4699 19.9021 10.12C19.8999 10.0646 19.9092 10.0094 19.9293 9.95782C19.9494 9.9062 19.98 9.85928 20.0191 9.82001L21.0031 8.83601C21.0299 8.80897 21.0641 8.79027 21.1013 8.78215C21.1386 8.77404 21.1774 8.77686 21.2131 8.79027C21.2488 8.80368 21.2799 8.82712 21.3026 8.85776C21.3253 8.88841 21.3386 8.92495 21.3411 8.96301C21.5263 11.7542 21.456 14.5566 21.1311 17.335C20.8951 19.357 19.2711 20.942 17.2581 21.167C13.7634 21.554 10.2367 21.554 6.74206 21.167C4.73006 20.942 3.10506 19.357 2.86906 17.335C2.45446 13.7904 2.45446 10.2096 2.86906 6.66501C3.10506 4.64301 4.72906 3.05801 6.74206 2.83301C9.39443 2.53889 12.0668 2.46764 14.7311 2.62001C14.7692 2.62275 14.8057 2.63635 14.8364 2.65922C14.867 2.68209 14.8904 2.71325 14.9039 2.74903C14.9174 2.78481 14.9203 2.82369 14.9124 2.86108C14.9044 2.89847 14.8859 2.93281 14.8591 2.96001L13.8661 3.95201C13.8272 3.99076 13.7807 4.02113 13.7297 4.04125C13.6786 4.06137 13.6239 4.07082 13.5691 4.06901C11.3458 3.99343 9.12001 4.07866 6.90906 4.32401C6.263 4.39552 5.65991 4.68273 5.19721 5.13926C4.73451 5.59579 4.43923 6.19497 4.35906 6.84001C3.9581 10.2683 3.9581 13.7317 4.35906 17.16C4.43923 17.805 4.73451 18.4042 5.19721 18.8608C5.65991 19.3173 6.263 19.6045 6.90906 19.676C10.2641 20.051 13.7361 20.051 17.0921 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8608C19.2666 18.4042 19.5609 17.805 19.6411 17.16Z"
                  fill="#222222"
                />
              </svg>
            </Link>
          </div>
        </div>
    </div>
      </div>
    </div>
  );
};
