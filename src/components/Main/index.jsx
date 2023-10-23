import { useState, useEffect, useCallback } from "react";
import "./style.css";
import ColorCard from "../Card";

export default function Main() {
  const urlColors = "https://reqres.in/api/colors";

  const [colors, setColors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ year: "", pantone_value: "" });

  const fetchColors = useCallback(async () => {
    const listPage = page ? `?page=${page}` : "";
    try {
      const response = await fetch(`${urlColors}${listPage}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setColors(data.data);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error at getting data colors:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);

    const { color } = data;
    navigator.clipboard
      .writeText(color)
      .then(() => {
        // Color copied to the clipboard successfully!
      })
      .catch((err) => {
        console.error("Error copying the color to the clipboard:", err);
      });

    setTimeout(() => {
      setIsModalOpen(false);
    }, 500);
  };

  const limitPrevButton = page === 1;
  const limitNextButton = page === totalPages;

  const incrementPage = () => {
    page < totalPages && setPage(page + 1);
  };
  const decrementPage = () => {
    page > 1 && setPage(page - 1);
  };

  return (
    <main>
      <section className="color__container">
        <ul className="card__container">
          {colors.map((color) => (
            <ColorCard
              key={color.id}
              color={color}
              onClick={() => openModal(color)}
            />
          ))}
          {isModalOpen && (
            <section className="modal__container">
              <div
                className="modal"
                style={{ background: `${modalData.color}` }}
              >
                <p className="modal__year">{modalData.year}</p>
                <p className="modal__copied">Copied!</p>
                <p className="modal__pantone">{modalData.pantone_value}</p>
              </div>
            </section>
          )}
        </ul>
        <div className="button__container">
          <button
            onClick={decrementPage}
            className={`button ${limitPrevButton ? "button__disabled" : ""}`}
            disabled={limitPrevButton}
          >
            {limitPrevButton ? (
              <i className="fa-solid fa-ban"></i>
            ) : (
              <>
                <i className="fa-solid fa-chevron-left"></i> Prev
              </>
            )}
          </button>
          <button
            onClick={incrementPage}
            className={`button ${limitNextButton ? "button__disabled" : ""}`}
            disabled={limitNextButton}
          >
            {limitNextButton ? (
              <i className="fa-solid fa-ban"></i>
            ) : (
              <>
                Next <i className="fa-solid fa-chevron-right"></i>
              </>
            )}
          </button>
        </div>
      </section>
    </main>
  );
}
