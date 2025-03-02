if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  let recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  let taskinput = document.querySelector("#taskinput");

  let tasklist = document.querySelector(".tasklist");

  taskinput.addEventListener("focus", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    let translate = event.results[0][0].transcript;
    taskinput.value = translate;
    addtask();
  };

  function addtask() {
    let tasktext = taskinput.value.trim();
    if (tasktext != "") {
      let taskitem = document.createElement("li");
      taskitem.innerHTML = `
            <span>${tasktext}</span><button class="del" onclick="deletetask(this)">Delete</button>
            `;
      tasklist.appendChild(taskitem);
      taskinput.value = "";
    }
    recognition.onend = () => {
      recognition.stop();
    };
    savedata();
  }

  function deletetask(e) {
    let liparent = e.parentNode;
    tasklist.removeChild(liparent);
    savedata();
  }

  function savedata() {
    localStorage.setItem("data", tasklist.innerHTML);
  }
  function showTask() {
    tasklist.innerHTML = localStorage.getItem("data");
  }
  showTask();
} else {
  alert("Your browser doesn't support speech recognition");
}
