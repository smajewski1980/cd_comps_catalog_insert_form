const artistLabel = document.querySelector("#comp-artist-label");
const artistInput = document.getElementById("cds-comps-tracks-artist");
const trackNameLabel = document.querySelector("#comp-track-label");
const trackNameInput = document.getElementById("cds-comps-tracks-track-name");
const cdsCompsForm = document.querySelector(".cds-comps");
const btnAddComp = document.getElementById("btn-add-item-cds-comps");
// const allTrackInputs = document.querySelectorAll('.track-name')
cdsCompsForm.children[1].focus();
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
let counter = 2;
function addNewFields() {
  const newArtistLabel = artistLabel.cloneNode();
  newArtistLabel.removeAttribute("id");
  newArtistLabel.innerText = `${counter} ARTIST`;
  const newArtistInput = artistInput.cloneNode();
  newArtistInput.value = "";
  const newTrackLabel = trackNameLabel.cloneNode();
  newTrackLabel.removeAttribute("id");
  newTrackLabel.innerText = `${counter} TRACK NAME`;
  const newTrackInput = trackNameInput.cloneNode();
  newTrackInput.value = "";
  cdsCompsForm.insertBefore(newArtistLabel, btnAddComp);
  cdsCompsForm.insertBefore(newArtistInput, btnAddComp).focus();
  cdsCompsForm.insertBefore(newTrackLabel, btnAddComp);
  cdsCompsForm.insertBefore(newTrackInput, btnAddComp);
  counter++;
}

btnAddComp.addEventListener("click", (e) => {
  e.preventDefault();
  // we have to assemble the object for the post request body
  const formInputs = cdsCompsForm.querySelectorAll("input");
  const newCompObj = {
    title: formInputs[0].value,
    year: formInputs[1].value,
    location: formInputs[2].value,
    tracks: [],
  };

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
