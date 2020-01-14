import React from 'react';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; //Editor
import draftToHtml from 'draftjs-to-html';
import Module from '../../../modules/Module';
import Axios from 'axios';
import ErrorText from '../../../components/element/Text/ErrorText';
import { Redirect } from 'react-router-dom';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class CreateArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: "",
            url: "",
            paragraph: "",
            tags: "",
            thumbnail: "",
            errors: {},
            created: false,
            loading: false
        
        }

        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onTitleStateChange = this.onTitleStateChange.bind(this);
        this.onUrlStateChange = this.onUrlStateChange.bind(this);
        this.onTagsStateChange = this.onTagsStateChange.bind(this);
        this.onThumbnailsStateChange = this.onThumbnailsStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState: editorState,
            paragraph: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    }

    onTitleStateChange(event) {
        this.setState({ title: event.target.value, url: Module.ConvertURL(event.target.value) });
    }
    onUrlStateChange(event) {
        this.setState({ url: Module.ConvertURL(event.target.value) });
    }
    onTagsStateChange(event) {
        this.setState({ tags: event.target.value });
    }
    onThumbnailsStateChange(event) {
        this.setState({ thumbnail: event.target.value })
    }
    
    onSubmit(event) {
        event.preventDefault()
        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/articles`,
                data: {
                    title: this.state.title,
                    url: this.state.url,
                    paragraph: this.state.paragraph,
                    thumbnail: this.state.thumbnail,
                    tags: this.state.tags
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({errors: data.errors, loading: false})
                }
                else {
                    this.setState({
                        created: true,
                        errors: {},
                        loading: false
                    }, () => window.alert("Đăng bài thành công"));
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false})
            })
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <Management>
                {
                    this.state.created && <Redirect to={`/management-site/article/edit/${this.state.url}`} />
                }
                { loading && <LoadingStore /> }
                <form onSubmit={this.onSubmit} className="create-article-page">
                    <div className="create-article-page__main">
                        <Box margin="0 0 15px" title="Nội dung bài viết">
                            <Input onChange={this.onTitleStateChange} value={this.state.title} type="text" placeholder="Nhập tên tiêu đề bài viết" square/>
                            {
                                (this.state.errors && this.state.errors.title) &&<ErrorText> { this.state.errors.title.msgVi } </ErrorText>
                            }
                            <Input onChange={this.onUrlStateChange} value={this.state.url} type="text" placeholder="Nhập đường dẫn bài viết" square/>
                            {
                                (this.state.errors && this.state.errors.url) &&<ErrorText> { this.state.errors.url.msgVi } </ErrorText>
                            }
                            <div className="create-article-page__main__paragraph">
                                <Editor
                                    editorState={this.state.editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                                {
                                    (this.state.errors && this.state.errors.paragraph) &&<ErrorText> { this.state.errors.paragraph.msgVi } </ErrorText>
                                }
                            </div>
                        </Box>
                        <Box margin="15px 0" title="Thể loại #">
                            <Input onChange={this.onTagsStateChange} value={this.state.tags} type="text" placeholder="Nhập thể loại bài viết" square/>
                            {
                                (this.state.errors && this.state.errors.tags) &&<ErrorText> { this.state.errors.tags.msgVi } </ErrorText>
                            }
                        </Box>
                    </div>
                    <div className="create-article-page__side">
                        <Box title="Đăng bài">
                            <Input type="submit" value="Đăng bài" violet/>
                        </Box>
                        <Box title="Ảnh đại diện" margin="15px 0">
                            <Input onChange={this.onThumbnailsStateChange} type="text" value={this.state.thumbnail} placeholder="Đường dẫn ảnh địa diện" />
                            {
                                this.state.thumbnail && <img src={this.state.thumbnail} style={{width: "100%", height: "200px", objectFit: "cover"}} />
                            }
                            {
                                (this.state.errors && this.state.errors.thumbnail) &&<ErrorText> { this.state.errors.thumbnail.msgVi } </ErrorText>
                            }
                        </Box>
                    </div>
                </form>
            </Management>
        )
    }
}

export default CreateArticlePage;