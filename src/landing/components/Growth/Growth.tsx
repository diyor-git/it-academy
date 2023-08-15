import React from "react";
import "./Growth.scss";
import {Collapse} from "antd";
import {useTranslation} from "react-i18next";

const Growth = () => {
    const {Panel} = Collapse;
    const {t} = useTranslation()
    return (
        <div className="growth">
            <div className="container">
                <h2 className='title'>{t('about9')} <span>{t('about46')}</span></h2>
                <div className="accordion">
                    <Collapse accordion>
                        <Panel header={t('about10')} key="1">
                            <p>
                                {t('about11')}
                            </p>
                            <p>{t('about12')}</p>
                            <p>{t('about13')}</p>
                        </Panel>
                        <Panel header={t('about14')} key="2">
                            <p>{t('about15')}</p>
                            <p>{t('about16')}</p>
                        </Panel>
                        <Panel
                            header={t('about17')} key="3">
                            <p>{t('about18')}</p>
                            <p>{t('about19')}</p>
                        </Panel>
                        <Panel header={t('about20')} key="4">
                            <p>{t('about21')}</p>
                            <p>{t('about22')}</p>
                        </Panel>
                        <Panel header={t('about23')} key="5">
                            <p>{t('about24')}</p>
                            <p>{t('about25')}</p>
                        </Panel>
                        <Panel header={t('about26')} key="6">
                            <p>{t('about27')}</p>
                        </Panel>
                        <Panel header={t('about28')} key="7">
                            <p>{t('about29')}</p>
                            <p>{t('about30')}</p>
                            <p>{t('about31')}</p>
                            <p>{t('about32')}</p>
                            <p>{t('about33')}</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

export default Growth
