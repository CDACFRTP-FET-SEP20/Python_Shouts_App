import React, { useState } from "react";
import TextDialog from "./TextModal";
function Text() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        Dialog
      </button>
      <TextDialog
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></TextDialog>
    </div>
  );
}

export default Text;
