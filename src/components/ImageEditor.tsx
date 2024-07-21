import styles from "./ImageEditor.module.css";
import choeseImg from "../assets/image-placeholder.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
// type
type filtersValues_type = {
  brightness: boolean;
  saturation: boolean;
  inversion: boolean;
  Grayscale: boolean;
};

let brightness = 100,
  saturate = 100,
  invert = 0,
  grayscale = 0,
  rotate = 0,
  scaleY = 1,
  scaleX = 1;
const s_filter = {
  filter: `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%)`,
};
const filtersValues = {
  brightness: false,
  saturation: false,
  inversion: false,
  Grayscale: false,
};
const s_rotate = {
  transform: `rotate(${rotate}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
};
function ImageEditor() {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // states
  const [filtersActive, setfiltersActive] = useState<boolean>(true);
  const [filterActiveObj, setFilterActiveObj] =
    useState<filtersValues_type>(filtersValues);
  const [imageStyles, setImageStyles] = useState(s_filter);
  const [rotateStyles, setRotateStyles] = useState(s_rotate);
  const [rangeinfo, setRangeinfo] = useState({
    value: brightness,
    filterName: "",
  });

  // File Upload handler
  function uploadHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setfiltersActive(false);
      resetBtnHandler();
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
  // Rotate Handler
  function rotatehandler(e: MouseEvent) {
    type Id = "rLeft" | "rRight" | "horizontal" | "vertical";
    const id: Id = e.target.id;
    if (id === "rLeft") {
      rotate -= 90;
      setRotateStyles({
        transform: `rotate(${rotate}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
      });
    } else if (id === "rRight") {
      rotate += 90;
      setRotateStyles({
        transform: `rotate(${rotate}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
      });
    } else if (id === "horizontal") {
      scaleX = scaleX === 1 ? -1 : 1;
      setRotateStyles({
        transform: `rotate(${rotate}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
      });
    } else if (id === "vertical") {
      scaleY = scaleY === 1 ? -1 : 1;
      setRotateStyles({
        transform: `rotate(${rotate}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
      });
    }
  }
  function resetBtnHandler() {
    // reset filter button
    setFilterActiveObj({
      ...filtersValues,
      brightness: true,
    });
    // reset filters
    brightness = 100;
    saturate = 100;
    invert = 0;
    grayscale = 0;
    setImageStyles(s_filter);
    //reset range input
    setRangeinfo({
      value: brightness,
      filterName: "",
    });
    // reset rotate
    rotate = 0;
    scaleY = 1;
    scaleX = 1;
    setRotateStyles(s_rotate);
  }
  // save image handler
  function saveImageHandler() {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!ctx || !c || !imgRef.current) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = `${imageStyles.filter}`;
    ctx.translate(c.width / 2, c.height / 2);
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    if (scaleX !== 1 || scaleY !== 1) {
      ctx.scale(scaleX, scaleY);
      console.log("a");
    }
    ctx.drawImage(imgRef.current, -200, -200, c.width, c.height);
    const a = document.createElement("a");

    // a.href = c?.toDataURL() as string;
    // a.download = "edited.jpg";
    // a.click();
  }
  useEffect(() => {
    const keys = Object.keys(filterActiveObj);
    const filterProperty = keys.find((item) => true === filterActiveObj[item]);
    if (!filterProperty) return;
    setRangeinfo((preState) => ({ ...preState, filterName: filterProperty }));
  }, [filterActiveObj]);

  return (
    <>
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
              <div
                className={styles.rotate_Button_Container}
                onClick={rotatehandler}
              >
                <button className={styles.left} id="rLeft">
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button className={styles.right} id="rRight">
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
                <button className={styles.horizontal} id="horizontal">
                  <i className="bx bx-reflect-vertical"></i>
                </button>
                <button className={styles.vertical} id="vertical">
                  <i className="bx bx-reflect-horizontal"></i>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              ref={imgRef}
              src={choeseImg}
              style={{ ...imageStyles, ...rotateStyles }}
              alt="image not found"
            />
          </div>
        </div>
        <div className={styles.controlers}>
          <button className={styles.resetBtn} onClick={resetBtnHandler}>
            reset filters
          </button>
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
            <button
              className={styles.saveBtn}
              disabled={filtersActive}
              onClick={saveImageHandler}
            >
              save Image
            </button>
          </section>
        </div>
      </section>
      <canvas
        ref={canvasRef}
        className={styles.image_canvas}
        width={400}
        height={400}
        // style={{ ...imageStyles, ...rotateStyles }}
      ></canvas>
    </>
  );
}

export default ImageEditor;
