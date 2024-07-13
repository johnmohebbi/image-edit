import styles from "./ImageEditor.module.css";
import choeseImg from "../assets/image-placeholder.svg";
function ImageEditor() {
  return (
    <section className={styles.image_editor_Container}>
      <h2>image edit</h2>
      <div className={styles.editImage_container}>
        <div className={styles.filters_container}>
            <span>Filters</span>
          <div className={styles.wraper_btns}>
            <button className={`${styles.filter_button} ${styles.Brightness}`}>
              Brightness
            </button>
            <button className={`${styles.filter_button} ${styles.Saturation}`}>
              Saturation
            </button>
            <button className={`${styles.filter_button} ${styles.Inversion}`}>
              Inversion
            </button>
            <button className={`${styles.filter_button} ${styles.Grayscale}`}>
              Grayscale
            </button>
            <input type="range" name="range" id="range" min={0} max={100} />
          </div>
          <div className={styles.rotate}>
            <span>Rotate</span>
            <button className={styles.left}>left</button>
            <button className={styles.right}>right</button>
            <button className={styles.horizontal}>horizontal</button>
            <button className={styles.vertical}>horizontal</button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={choeseImg} alt="image not found" />
        </div>
      </div>
      <div className={styles.controlers}>
        <button className={styles.resetBtn}>reset filters</button>
        <form>
          <input type="file" className={styles.uploadBtn} accept=".jpg,jpeg" />
        </form>
        <button className={styles.saveBtn}>save Image</button>
      </div>
    </section>
  );
}

export default ImageEditor;
