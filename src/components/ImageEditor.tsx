import styles from "./ImageEditor.module.css";
import choeseImg from "../assets/image-placeholder.svg";
import { ChangeEvent, useRef } from "react";
function ImageEditor() {
  const imgRef = useRef<HTMLImageElement>(null);
  function uploadHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        if (imgRef.current) {
          imgRef.current.src = fileReader.result as string;
        }
      });
      fileReader.addEventListener("error", () => {
        console.log("we can not read your file");
      });
    }
  }
  return (
    <section className={styles.image_editor_Container}>
      <h2>image edit</h2>
      <div className={styles.editImage_container}>
        <div className={`${styles.filters_container} ${styles.nonActive}`}>
          <section>
            <span>Filters</span>
            <div className={styles.wraper_btns}>
              <button
                className={`${styles.filter_button} ${styles.Brightness}`}
              >
                Brightness
              </button>
              <button
                className={`${styles.filter_button} ${styles.Saturation}`}
              >
                Saturation
              </button>
              <button className={`${styles.filter_button} ${styles.Inversion}`}>
                Inversion
              </button>
              <button className={`${styles.filter_button} ${styles.Grayscale}`}>
                Grayscale
              </button>
              <span>Grayscale</span>
              <span>100%</span>
              <input
                type="range"
                name="range"
                className={styles.rangeInp}
                min={0}
                max={100}
              />
            </div>
          </section>

          <div className={styles.rotate}>
            <span>Rotate</span>
            <div className={styles.rotate_Button_Container}>
              <button className={styles.left}>
                <i className="fa-solid fa-rotate-left"></i>
              </button>
              <button className={styles.right}>
                <i className="fa-solid fa-rotate-right"></i>
              </button>
              <button className={styles.horizontal}>
                <i className="bx bx-reflect-vertical"></i>
              </button>
              <button className={styles.vertical}>
                <i className="bx bx-reflect-horizontal"></i>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img ref={imgRef} src={choeseImg} alt="image not found" />
        </div>
      </div>
      <div className={styles.controlers}>
        <button className={styles.resetBtn}>reset filters</button>
        <section>
          {" "}
          <label htmlFor="photoUpload" className={styles.chooseBtn}>
            upload file
          </label>
          <input
            type="file"
            id="photoUpload"
            accept=".jpg,jpeg"
            onChange={uploadHandler}
          />
          <button className={styles.saveBtn}>save Image</button>
        </section>
      </div>
    </section>
  );
}

export default ImageEditor;
