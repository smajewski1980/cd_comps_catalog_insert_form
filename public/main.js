const artistLabel = document.querySelector("#comp-artist-label");
const artistInput = document.getElementById("cds-comps-tracks-artist");
const trackNameLabel = document.querySelector("#comp-track-label");
const trackNameInput = document.getElementById("cds-comps-tracks-track-name");
const cdsCompsForm = document.querySelector(".cds-comps");
const btnAddComp = document.getElementById("btn-add-item-cds-comps");
// const allTrackInputs = document.querySelectorAll('.track-name')

cdsCompsForm.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    const allTrackInputs = document.querySelectorAll(".track-name");
    const activeElem = document.activeElement;
    // need to see if a track name input has focus
    if (activeElem === allTrackInputs[allTrackInputs.length - 1]) {
      console.log("i think we got it");
      // then add the new elements
      addNewFields();
    }
    return false;
  }
});
// trackNameInput.addEventListener("keypress", (e) => {
//   if (e.key == "Enter") {
//     console.log("i think this will work");
//   }
// });

function addNewFields() {
  const newArtistLabel = artistLabel.cloneNode();
  newArtistLabel.removeAttribute("id");
  newArtistLabel.innerText = "ARTIST";
  const newArtistInput = artistInput.cloneNode();
  newArtistInput.value = "";
  const newTrackLabel = trackNameLabel.cloneNode();
  newTrackLabel.removeAttribute("id");
  newTrackLabel.innerText = "TRACK NAME";
  const newTrackInput = trackNameInput.cloneNode();
  newTrackInput.value = "";
  cdsCompsForm.insertBefore(newArtistLabel, btnAddComp);
  cdsCompsForm.insertBefore(newArtistInput, btnAddComp).focus();
  cdsCompsForm.insertBefore(newTrackLabel, btnAddComp);
  cdsCompsForm.insertBefore(newTrackInput, btnAddComp);
}

btnAddComp.addEventListener("click", (e) => {
  // e.preventDefault();
  cdsCompsForm.querySelectorAll("input").forEach((input) => {
    console.log(`${input.name}:${input.value}`);
    // we have to assemble the object for the post request body
  });
  // cdsCompsForm.reset();
  // cdsCompsForm.children[0].focus();
  // console.log(trackNameInput.value);
});
