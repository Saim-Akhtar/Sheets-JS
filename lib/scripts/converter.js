const reader = new FileReader();
const fileInput = document.getElementById('fileUpload');
const table = document.getElementById('table');
fileInput.addEventListener('change', e => {
  const myFile = e.target;
  reader.readAsArrayBuffer(myFile.files[0]);
  reader.onload = () => {
    const data = new Uint8Array(reader.result);
    const wb = XLSX.read(data, { type: 'array' });
    try {
      const htmlstr = XLSX.write(wb, {
        sheet: 'Sheet1',
        type: 'binary',
        bookType: 'html'
      });
      table.innerHTML = htmlstr;
    } catch (error) {
      console.log(
        'File Foramt Not Supported As we have the Error: ' + error.message
      );
      table.innerHTML = `Error: ${error.message}`;
    }
  };
});
