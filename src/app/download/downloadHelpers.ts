export const downloadTextAsPdf = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' }); // Create a Blob
    const url = window.URL.createObjectURL(blob); // Create a temporary URL for the Blob
  
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'text.pdf'); // Set filename as "text.pdf"
  
    document.body.appendChild(link); // Append the link to the body (temporary)
    link.click(); // Simulate a click to trigger download
  
    // Clean up the temporary URL (optional)
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 0);
  };
  