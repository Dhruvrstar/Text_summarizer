const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;

  // Check if the text exceeds 2000 characters
  if (textarea.value.length > 2000) {
    alert("⚠️ Text is too long! Please keep it under 2000 characters.");
    textarea.value = textarea.value.slice(0, 2000); // Trim excess characters
  }

  // Enable or disable button based on text length
  if (textarea.value.length >= 200 && textarea.value.length <= 2000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  let text_to_summarize = textArea.value;

  // If text is still too long, alert and stop
  if (text_to_summarize.length > 2000) {
    alert("⚠️ Text is too long! Please shorten it before submitting.");
    return;
  }

  submitButton.classList.add("submit-button--loading");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('/summarize', requestOptions)
    .then(response => response.json())
    .then(data => {
      summarizedTextArea.value = "📝 " + data.summary;
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
      submitButton.classList.remove("submit-button--loading");
    });
}
