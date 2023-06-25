export function downloadBase64Image(
  base64Image: string,
  filename: string
): void {
  // This part would depend on how your base64 string looks like.
  // Usually they start with "data:image/jpeg;base64,", "data:image/png;base64," etc.
  const base64ImageContent = base64Image.replace(
    /^data:image\/[a-z]+;base64,/,
    ""
  );

  // Convert base64 to raw binary data held in a string
  let byteCharacters = atob(base64ImageContent);

  // Create an ArrayBuffer
  let arrayBuffer = new ArrayBuffer(byteCharacters.length);

  // Create a new Uint8Array
  let byteNumbers = new Uint8Array(arrayBuffer);

  // Assign the decoded characters to the Uint8Array
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Create a blob object
  let blob = new Blob([byteNumbers], {
    type: "image/png", // Adjust the mime type accordingly
  });

  // Create a link element
  const link = document.createElement("a");

  // Set the download attribute
  link.download = filename;

  // Create a URL for the blob object
  link.href = URL.createObjectURL(blob);

  // Append the link to the body
  document.body.appendChild(link);

  // Simulate click
  link.click();

  // Remove the link after download
  setTimeout(function () {
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, 100);
}

export const base64ToFile = async (base64: string, filename: string) => {
  const data = await fetch(base64);
  const blob = await data.blob();
  const file = await new File([blob], filename, { type: "image/png" });
  return file;
};

export const base64ToFiles = async (base64: string[], filename: string) => {
  const files = await Promise.all(
    base64.map(async (base64) => {
      const res = await fetch(base64);
      const buf = await res.arrayBuffer();
      const file = new File([buf], "output.png" || filename, {
        type: "image/png",
      });

      return file;
    })
  );
  return files;
};

export function base64ImageToBlob(str: string) {
  // extract content type and base64 payload from original string
  var pos = str.indexOf(";base64,");
  var type = str.substring(5, pos);
  var b64 = str.substr(pos + 8);

  // decode base64
  var imageContent = atob(b64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;
}

export async function dataToFile(
  image: string,
  filename: string,
  mimeType: string = "image/jpeg"
) {
  const base64Response = await fetch(`data:image/jpeg;base64,${image}`);
  const blob = await base64Response.blob();
  const file = new File([blob], filename, { type: mimeType });
  return file;
}

export async function downloadImage(imageSrc: string) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "image";
  document.body.appendChild(link);
  // Simulate click
  link.click();

  // Remove the link after download
  setTimeout(function () {
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, 100);
}
