const artistLabel = document.querySelector("#comp-artist-label");
const artistInput = document.getElementById("cds-comps-tracks-artist");
const trackNameLabel = document.querySelector("#comp-track-label");
const trackNameInput = document.getElementById("cds-comps-tracks-track-name");
const cdsCompsForm = document.querySelector(".cds-comps");
const btnAddComp = document.getElementById("btn-add-item-cds-comps");

cdsCompsForm.children[1].focus();

// if enter is hit while focused in a track field,
// another artist and track field shows up to enter next track
cdsCompsForm.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    const allTrackInputs = document.querySelectorAll(".track-name");
    const activeElem = document.activeElement;
    // need to see if a track name input has focus
    if (activeElem === allTrackInputs[allTrackInputs.length - 1]) {
      // then add the new elements
      addNewFields();
    }
    return false;
  }
});

// counter to place a number in the UI before the added fields
let counter = 2;
function addNewFields() {
  // clone the first artist and track label and input nodes
  const newArtistLabel = artistLabel.cloneNode();
  const newArtistInput = artistInput.cloneNode();
  const newTrackLabel = trackNameLabel.cloneNode();
  const newTrackInput = trackNameInput.cloneNode();
  //  remove the id, so there is only one per page
  newArtistLabel.removeAttribute("id");
  newTrackLabel.removeAttribute("id");
  // add the text content
  newArtistLabel.innerText = `${counter} ARTIST`;
  newTrackLabel.innerText = `${counter} TRACK NAME`;
  // clear the input values
  newArtistInput.value = "";
  newTrackInput.value = "";
  // insert at the end of form right before the button
  cdsCompsForm.insertBefore(newArtistLabel, btnAddComp);
  cdsCompsForm.insertBefore(newArtistInput, btnAddComp).focus();
  cdsCompsForm.insertBefore(newTrackLabel, btnAddComp);
  cdsCompsForm.insertBefore(newTrackInput, btnAddComp);
  counter++;
}

btnAddComp.addEventListener("click", (e) => {
  e.preventDefault();
  // assemble the object for the post request body
  const formInputs = cdsCompsForm.querySelectorAll("input");
  const newCompObj = {
    title: formInputs[0].value,
    year: formInputs[1].value,
    location: formInputs[2].value,
    tracks: [],
  };

  // no matter how many track are entered, this loop adds them to the tracks array
  for (let i = 3; i < formInputs.length; i += 2) {
    const newSong = {
      artist: formInputs[i].value,
      track_name: formInputs[i + 1].value,
    };
    newCompObj.tracks.push(newSong);
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCompObj),
  };

  fetch("/comps", options).then((res) => {
    if (!res.ok) {
      console.log("shit went wrong");
    }
    if (res.ok) {
      location.reload();
    }
  });
});
