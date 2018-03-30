import React, { Component } from 'react';
import PropTypes from 'prop-types';
import displayPage from './_PageContainer';

class News extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { News } = this.props.gsheet;
        const newsDisplayed = News.filter(n => n['Publiée'] == '1');

        return (
            <div>
                <h1>News</h1>
                {newsDisplayed.map((news, i) => {
                    return (
                        <div key={`'news_${i}`}>
                            <h2>{news.Titre}</h2>
                            <h4>Le {news.Date}</h4>
                            <img src={news.Thumbnail} />
                            <div dangerouslySetInnerHTML={{ __html: news.Contenu }}></div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

News.propTypes = {
    gsheet: PropTypes.object.isRequired,
}

export default displayPage(News)