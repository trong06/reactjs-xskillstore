import React from 'react';
import LayoutMedium from '../components/layout/LayoutMedium';
import Store from '../components/layout/Common/Store';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Seperate from '../components/element/Seperate';
import Module from '../modules/Module';
import LoadingStore from '../components/element/Loading/LoadingStore';

class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            title: "",
            url: "",
            paragraph: "",
            tags: "",
            author: "",
            thumbnail: "",
            created: "",
            got: true
        }

        this.ID_ARTICLE = this.props.match.params.id
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/articles/${this.ID_ARTICLE}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Bài viết này không còn tồn tại");
                    this.setState({got: false, loading: false});
                }
                else {
                    const { article } = data;
                    this.setState({
                        title: article.title,
                        url: article.url,
                        paragraph: article.paragraph,
                        tags: article.tags,
                        author: article.author ? JSON.parse(article.author) : null,
                        created: article.created,
                        thumbnail: article.thumbnail,
                        loading: false
                    }, () => {
                        document.getElementById("article-paragraph-js").innerHTML = this.state.paragraph;
                    })
                }
            }).catch(err => {
                window.alert(err);
                this.setState({got: false, loading: false});
            })
        })
    }

    render() {
        const { title, url, thumbnail, paragraph, created, author, tags, got, loading } = this.state;
        return (
            <Store>
                {
                    !got && <Redirect to="/error404" />
                }
                { loading && <LoadingStore /> }
                <div className="article-page">
                    <div className="article-page__image">
                        <img src={thumbnail} className="article-page__image__child" />
                    </div>
                    <LayoutMedium>
                        <h1 className="article-page__title"> {title} </h1>
                        <div className="article-page__detail">
                            <p> <b>Ngày đăng: </b> { Module.DateBeautiful(created) } </p>
                            <p><b>Người đăng:</b> {author.username} </p>
                        </div>
                        <Seperate />
                        <div id="article-paragraph-js" className="article-page__content"></div>
                        <div className="article-page__tags">
                            <p className="article-page__tags__titlte"><b>Tags: </b></p>
                            <span className="article-page__tags__text"> { tags.indexOf(",") !== -1 ? tags.split(",").map(e => `#${e.trim()}`).join(" ") : `#${tags}` } </span>
                        </div>
                    </LayoutMedium>
                </div>
            </Store>
        )
    }
}

export default ArticlePage;