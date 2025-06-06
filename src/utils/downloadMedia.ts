export const downloadFile = (name: string, url: string, format: string) => {
  try {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${name}.${format}`;
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);
      });
  } catch (error) {
    console.error("Failed to download file: ", error);
  }
};

export default downloadFile;
