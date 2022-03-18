import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

const PaginationDyn = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  // const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
        )
        .then((response) => {
          // setPhotos(response.data); доб в состояние полученные фотки
          // но лучше так, чтобы не перезатирать состояние то созд новый массив и в него
          // старые фотки и новые из запроса
          setPhotos([...photos, ...response.data]);
          setCurrentPage((prevState) => prevState + 1); // после загр данных увел страницу
          // setTotalCount(response.headers["x-total-count"]);
        })
        .finally(() => {
          setFetching(false); //при любом исходе вернуть false ибо данные уже загрузились
        });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler); // не забываем очищать
    };
  }, []); // раз массив пуст то отработает единожды

  const scrollHandler = (e) => {
    // из общей высоты страницы с учетом прокрутки отнимаем сумму видимой области и
    // текущее расстояние от верхнего края страницы, за счет этого при приближении к
    // нижнему краю отрабатывает setfetching догружающий еще фотки.
    // И если текущий размер массива с фотками равен общему колву фоток на сервере то запрос не шлем
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
      // && photos.length < totalCount
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="wrapper">
      <h1>Dinamic pagination</h1>
      {/* чтоб динамика работала убираем класс photos */}
      <div className="photos">
        {photos.map((photo) => (
          <div className="photo" key={photo.id}>
            <div className="title">
              {photo.id} {photo.title}
            </div>
            <img src={photo.thumbnailUrl} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginationDyn;
