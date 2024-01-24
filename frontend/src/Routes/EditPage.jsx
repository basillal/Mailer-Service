import React, { useEffect, useState } from "react";
import { Nav } from "../Nav";
import { Header } from "../Header";
import { Editor } from "../Editor";
import axios from "axios";

export const EditPage = () => {
  const [content, setContent] = useState('');
  const [templateName, setTemplateName] = useState('');
  const fetchTemplate = async (templateName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/view-template/${templateName}`);
      setContent(response.data.existing_html_content);
    } catch (error) {
      console.error('Error updating template:', error.message);
    }
  }

  const updateTemplate = async (content) => {
    try {
      // Assuming 'content' is the HTML content from the Jodit Editor
      const htmlContent = content;

      // Fetch HTML content for the selected template
      const response = await axios.post(`http://127.0.0.1:8000/update-template/${templateName}`, {
        html_content: htmlContent,
      });

      alert('template updated')
    } catch (error) {
      console.error('Error updating template:', error.message);
    }
  };

  useEffect(() => {
    const templateName = window.location.href.split('/')[4]
    if (!templateName) alert('NO TEMPLATE NAME FOUND')
    else {
      fetchTemplate(templateName)
      setTemplateName(templateName)
    }
  }, []);


  return (
    <>
      <Nav />
      <Header title={'Edit Template'} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Editor key={content} updateTemplate={updateTemplate} contentData={content} />
    </>
  )
};
