import "./StudentsWork.scss";
import triangle from "../../../assets/image/triangle.png";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getPortfolioSelector } from "../../../redux/selectors/usersSelectors";
import React, { useEffect } from "react";
import { getPortfolio } from "../../../redux/reducers/usersReducer";
import Preloader from "../Preloader/Preloader";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

type PropsType = {
  works?: number;
  filters?: boolean;
  button?: boolean;
};
const StudentsWork: React.FC<PropsType> = ({ works, filters, button }) => {
  const {t} = useTranslation()
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => getPortfolioSelector(state));
  useEffect(() => {
    dispatch(getPortfolio());
  }, []);
  if (!portfolio) {
    return <Preloader />;
  }
  return (
    <section className="students-work">
      <div className="container">
        <div className="title">
          <h3>{t('works')}</h3>
          {filters && (
            <div className="filters">
              <div className="name">
                <img src={triangle} alt="" />
                <h6>{t('filter')}</h6>
              </div>
              <div>
                <button>frontend</button>
                <button>backend</button>
                <button>fullstack</button>
              </div>
            </div>
          )}
        </div>
        <div className="cards">
          {portfolio.slice(0, works).map((p, key: number) => (
            <div key={key} className="card">
              <Link
                to={
                  works === undefined
                    ? `/student/${p.profile_id}`
                    : "/students/portfolio"
                }
              >
                <div className="img">
                  <img src={p.photo} alt="Project" />
                </div>
                <div className="card-title">
                  <div className="avatar">
                    <img src={p.avatar} alt="Avatar" />
                  </div>
                  <div>
                    <h4>{p.full_name}</h4>
                    <h6>{p.skills}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {button && (
          <div style={{ textAlign: "center" }}>
            <Button text={t('seeAll')} color="violet" />
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentsWork;
