export const downloadFile = (name: string, url: string, format: string) => {
  try {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.${format}`;
        link.click();
        link.remove();
      });
  } catch (error) {
    console.error("Failed to download file: ", error);
  }
};

export default downloadFile;
