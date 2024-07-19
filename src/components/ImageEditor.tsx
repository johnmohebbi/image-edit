import styles from "./ImageEditor.module.css";
import choeseImg from "../assets/image-placeholder.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
let brightness = 100,
  saturate = 100,
  invert = 0,
  grayscale = 0;
let s = {
  filter: `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%)`,
};
const filtersValues = {
  brightness: false,
  saturation: false,
  inversion: false,
  Grayscale: false,
};
type filtersValues_type = {
  brightness: boolean;
  saturation: boolean;
  inversion: boolean;
  Grayscale: boolean;
};
function ImageEditor() {
  const imgRef = useRef<HTMLImageElement>(null);
  // states
  const [filtersActive, setfiltersActive] = useState<boolean>(true);
  const [filterActiveObj, setFilterActiveObj] =
    useState<filtersValues_type>(filtersValues);
  const [imageStyles, setImageStyles] = useState(s);
  const [rangeinfo, setRangeinfo] = useState({
    value: brightness,
    filterName: "",
  });

  // File Upload handler
  function uploadHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setfiltersActive(false);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        if (imgRef.current) {
          imgRef.current.src = fileReader.result as string;
          setFilterActiveObj({
            saturation: false,
            inversion: false,
            Grayscale: false,
            brightness: true,
          });
        }
      });
      fileReader.addEventListener("error", () => {
        console.log("we can not read your file");
      });
    }
  }

  // filter button Handler
  function filterbtnHandler(e: MouseEvent) {
    const btn: HTMLButtonElement = e.target;
    if (!btn.dataset.buttonName) return;

    const name_filter: string = btn.dataset.buttonName;
    switch (name_filter) {
      case "Brightness":
        setFilterActiveObj({
          ...filtersValues,
          brightness: true,
        });
        setRangeinfo((pstate) => ({ ...pstate, value: brightness }));
        break;
      case "Saturation":
        setFilterActiveObj({
          ...filtersValues,
          saturation: true,
        });
        setRangeinfo((pstate) => ({ ...pstate, value: saturate }));

        break;
      case "Inversion":
        setFilterActiveObj({
          ...filtersValues,
          inversion: true,
        });
        setRangeinfo((pstate) => ({ ...pstate, value: invert }));

        break;
      case "Grayscale":
        setFilterActiveObj({
          ...filtersValues,
          Grayscale: true,
        });
        setRangeinfo((pstate) => ({ ...pstate, value: grayscale }));

        break;
      default:
        return;
    }
  }
  // range Input Handler
  function rangeInputHandler(event: InputEvent) {
    if (!event.target) return;
    const value = event?.target?.value;
    if (rangeinfo.filterName === "brightness") {
      setRangeinfo((preState) => ({ ...preState, value }));
      brightness = value;

      setImageStyles({
        filter: `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%)`,
      });
    } else if (rangeinfo.filterName === "inversion") {
      setRangeinfo((preState) => ({ ...preState, value }));
      invert = value;

      setImageStyles({
        filter: `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%)`,
      });
    } else if (rangeinfo.filterName === "saturation") {
      setRangeinfo((preState) => ({ ...preState, value }));
      saturate = value;

      setImageStyles({
        filter: `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%)`,
      });
    } else {
      setRangeinfo((preState) => ({ ...preState, value }));
      grayscale = value;
      setImageStyles({
        filter: `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%)`,
      });
    }
  }

  useEffect(() => {
    const keys = Object.keys(filterActiveObj);
    const filterProperty = keys.find((item) => true === filterActiveObj[item]);
    if (!filterProperty) return;
    setRangeinfo((preState) => ({ ...preState, filterName: filterProperty }));
  }, [filterActiveObj]);
  return (
    <section className={styles.image_editor_Container}>
      <h2>image edit</h2>
      <div className={styles.editImage_container}>
        <div
          className={`${styles.filters_container} ${
            filtersActive ? styles.nonActive : ""
          }`}
        >
          <section>
            <span>Filters</span>
            <div className={styles.wraper_btns} onClick={filterbtnHandler}>
              <button
                className={`${styles.filter_button} ${
                  filterActiveObj.brightness ? styles.filter_Active : ""
                }`}
                data-button-name="Brightness"
              >
                Brightness
              </button>
              <button
                className={`${styles.filter_button}  ${
                  filterActiveObj.saturation ? styles.filter_Active : ""
                }`}
                data-button-name="Saturation"
              >
                Saturation
              </button>
              <button
                className={`${styles.filter_button}  ${
                  filterActiveObj.inversion ? styles.filter_Active : ""
                }`}
                data-button-name="Inversion"
              >
                Inversion
              </button>
              <button
                className={`${styles.filter_button}  ${
                  filterActiveObj.Grayscale ? styles.filter_Active : ""
                }`}
                data-button-name="Grayscale"
              >
                Grayscale
              </button>
              <span>{rangeinfo?.filterName}</span>
              <span className={styles.rangeValue}>{rangeinfo.value}%</span>
              <input
                type="range"
                name="range"
                className={styles.rangeInp}
                min={0}
                max={100}
                value={rangeinfo.value}
                onInput={rangeInputHandler}
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
          <img
            ref={imgRef}
            src={choeseImg}
            style={imageStyles}
            alt="image not found"
          />
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
