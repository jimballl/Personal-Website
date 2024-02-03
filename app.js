function openTab(tabId, elmnt) {
    var i, tabcontent, tablinks;
  
    // Hide all elements with class="tabcontent"
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Show the specific tab content
    document.getElementById(tabId).style.display = "block";
  }

window.onload = function() {
    document.getElementById("Tab1").click();
};
