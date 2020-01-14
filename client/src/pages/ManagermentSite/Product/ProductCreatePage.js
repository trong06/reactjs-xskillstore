import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";
import { EditorState, convertToRaw } from 'draft-js'; //Editor
import { Editor } from 'react-draft-wysiwyg'; //Editor
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; //Editor
import draftToHtml from 'draftjs-to-html'; //Editor
// import htmlToDraft from 'html-to-draftjs'; //Editor
import { Redirect } from 'react-router-dom';
import Management from '../../../components/layout/Common/Management';
import Input from '../../../components/element/Form/Input';
import Box from '../../../components/element/Box/Box';
import Module from '../../../modules/Module';
import Axios from 'axios';
import SuccessText from '../../../components/element/Text/SuccessText';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

// let optionsTags = [
//     {label: "One", value: 1},
//     {label: "Two", value: 2},
//     {label: "Three", value: 3},
// ];

class ProductCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorDescriptionState: EditorState.createEmpty(),
            editorInfoProductState: EditorState.createEmpty(),
            optionsTags: [],
            title: "",
            url: "",
            tags: [],
            thumbnails: [],
            images_detail: [],
            price: "",
            dropPrice: "",
            description: "",
            infomation_production: "",
            guarantee: "",
            size: [],
            gender: "",
            vendor: "",
            errors: {
                title: "",
                url: "",
                tags: [],
                price: "",
                description: "",
                size: [],
                gender: "",
                thumbnails: "",
                images_detail: "",
            },
            loading: false,
            created: false
        }

        this.date = new Date();

        this.onEditorDescriptionStateChange = this.onEditorDescriptionStateChange.bind(this);
        this.onEditorInfoProductStateChange = this.onEditorInfoProductStateChange.bind(this);
        this.onTitleStateChange = this.onTitleStateChange.bind(this);
        this.onUrlStateChange = this.onUrlStateChange.bind(this);
        this.onThumbnailsStateChange = this.onThumbnailsStateChange.bind(this);
        this.onPriceStateChange = this.onPriceStateChange.bind(this);
        this.onDropPriceStateChange = this.onDropPriceStateChange.bind(this);
        this.onGenderStateChange = this.onGenderStateChange.bind(this);
        this.onSizeStateChange = this.onSizeStateChange.bind(this);
        this.onImagesDetailStateChange = this.onImagesDetailStateChange.bind(this);
        this.onVendorStateChange = this.onVendorStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //editor
    onEditorDescriptionStateChange(editorState) {
        this.setState({
            editorDescriptionState: editorState,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };
    
    onEditorInfoProductStateChange(editorState) {
        this.setState({
            editorInfoProductState: editorState,
            infomation_production: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    }

    onTitleStateChange(event) {
        this.setState({
            title: event.target.value,
            url: Module.ConvertURL(event.target.value)
        })
    }

    onUrlStateChange(event) {
        let URL = Module.ConvertURL(event.target.value);
        this.setState({
            url: URL
        })
    }

    onThumbnailsStateChange(spec) {
        return (event) => {
            if(spec <= 0) {
                this.setState({
                    thumbnails: [event.target.value]
                })
            }
            else {
                this.setState({
                    thumbnails: [this.state.thumbnails[0], event.target.value]
                })
            }
        }
    }

    onSizeStateChange(event) {
        this.setState({
            size: event.target.value
        })
    }

    onPriceStateChange(event) {
        this.setState({
            price: event.target.value
        })
    }

    onDropPriceStateChange(event) {
        this.setState({
            dropPrice: event.target.value
        })
    }

    onGenderStateChange(event) {
        this.setState({
            gender: Number(event.target.value)
        })
    }

    onImagesDetailStateChange(event) {
        this.setState({
            images_detail: event.target.value
        })
    }
    
    onVendorStateChange(event) {
        this.setState({
            vendor: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        let data = {
            title: this.state.title,
            url: this.state.url,
            description: this.state.description,
            information_production: this.state.information_production,
            thumbnails: this.state.thumbnails,
            images_detail: this.state.images_detail.length > 0 ? this.state.images_detail.split(",") : [],
            tags: this.state.tags,
            price: this.state.price,
            dropPrice: this.state.dropPrice,
            size: this.state.size.length > 0 ? this.state.size.split(",") : [],
            gender: this.state.gender,
            vendor: this.state.vendor
        }

        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/products`,
                data: data,
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
                }
            }).then((res) => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({
                        errors: data.errors,
                        loading: false
                    })
                }
                else {
                    this.setState({
                        created: true,
                        loading: false
                    })
                }
            }).catch(err => {
                this.setState({loading: false})
                window.alert(err);
            })
        })
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/tags`
            }).then((res) => {
                const { data } = res;
                if(data.status !== "error") {
                    this.setState({loading: false})
                    if(data.tags.length > 0) {
                        data.tags.map(tag => {
                            this.setState({
                                optionsTags: [...this.state.optionsTags, { label: tag.name, value: tag._id }]
                            })
                        })
                    }
                }
                else {
                    this.setState({loading: false})
                    window.alert("Lỗi tải thể loại, vui lòng thử lại")
                }
            }).catch((err) => {
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
                    this.state.created && <Redirect to={`/management-site/product/edit/${this.state.url}`} />
                }
                { loading && <LoadingStore /> }
                <form onSubmit={this.onSubmit} className="product-create-page">
                    <div className="product-create-page__main">
                        {/* Tiêu đề và đường dẫn */}
                        <Box title="Tên sản phẩm và đường dẫn" errorText={
                            `${this.state.errors && this.state.errors.title ? this.state.errors.title.msgVi : "" }`
                            .concat(`${this.state.errors && this.state.errors.url ? " - " + this.state.errors.url.msgVi : ""}`)
                            }>
                            <Input placeholder="Tên sản phẩm" onChange={this.onTitleStateChange} value={this.state.title} square/>
                            <Input placeholder="Đường dẫn sản phẩm" onChange={this.onUrlStateChange} value={this.state.url} square/>
                        </Box>
                        <div className="product-create-page__main__box">
                            {/* Miêu tả về sản phẩm */}
                            <div>
                                <Box title="Miêu tả" errorText={this.state.errors && this.state.errors.description ? this.state.errors.description.msgVi : "" } margin="15px 5px">
                                    <Editor
                                    editorState={this.state.editorDescriptionState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorDescriptionStateChange}
                                    />
                                </Box>
                            </div>
                            {/* Miêu tả thông tin sản phẩm */}
                            <div>
                                <Box title="Thông tin sản phẩm" margin="15px 5px">
                                    <Editor
                                    editorState={this.state.editorInfoProductState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorInfoProductStateChange}
                                    />
                                </Box>
                            </div>
                        </div>
                        {/* Nhà sản xuất */}
                        <Box title="Nhà sản xuất" errorText={this.state.errors && this.state.errors.vendor ? this.state.errors.vendor.msgVi : "" }>
                            <Input onChange={this.onVendorStateChange} value={this.state.vendor} type="text" placeholder="Nhập tên nhà sản xuất" square/>
                        </Box>
                        <div className="product-create-page__main__box">
                            <div>
                                {/* Kích cở */}
                                <Box title="Kích cở" errorText={this.state.errors && this.state.errors.size ? this.state.errors.size.msgVi : "" } margin="15px 5px">
                                    <Input onChange={this.onSizeStateChange} value={this.state.size} type="text" placeholder="Nhập kích cở, mỗi kích cở cách nhau bởi dấu ," square/>
                                </Box>
                            </div>
                            <div>
                                {/* Giới tính */}
                                <Box title="Giới tính" errorText={this.state.errors && this.state.errors.gender ? this.state.errors.gender.msgVi : "" } margin="15px 5px">
                                    <div style={{textAlign: "center"}}>
                                        <SuccessText> <b>Bạn đã chọn: </b> { this.state.gender === 0 ? "Nam" : this.state.gender === 1 ? "Nữ" : "" } </SuccessText> <br />
                                        <input name="gender" width="inherit" type="radio" onChange={this.onGenderStateChange} value={0} /> Nam 
                                        <input name="gender" width="inherit" type="radio" onChange={this.onGenderStateChange} value={1} /> Nữ
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="product-create-page__side">
                        {/* Trạng thái  */}
                        <Box title="Trạng Thái Bài Đăng">
                            <span>
                                <b>Ngày đăng</b>: {`${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`}
                            </span>
                            <Input width="100%" type="submit" value="Đăng sản phẩm ngay" violet square/>
                        </Box>
                        {/* Thể loại */}
                        <Box title="Thể loại" errorText={this.state.errors && this.state.errors.tags ? this.state.errors.tags.msgVi : "" } margin="20px 0">
                            <MultiSelect options={this.state.optionsTags} selected={this.state.tags} onSelectedChanged={tags => this.setState({tags})} />
                        </Box>
                        {/* Giá  */}
                        <Box title="Giá sản phẩm" errorText={this.state.errors && this.state.errors.price ? this.state.errors.price.msgVi : "" } margin="15px 0">
                            <Input onChange={this.onPriceStateChange} value={this.state.price} type="number" placeholder="Giá mới" square/>
                            <Input onChange={this.onDropPriceStateChange} value={this.state.dropPrice} type="number" placeholder="Giá hủy bỏ" square/>
                        </Box>
                        {/* Ảnh  */}
                        <Box title="Thumbnails" errorText={this.state.errors && this.state.errors.thumbnails ? this.state.errors.thumbnails.msgVi : "" } margin="15px 0">
                            <Input onChange={this.onThumbnailsStateChange(0)} type="text" value={this.state.thumbnails[0]} placeholder="Thêm ảnh thumbnails của bạn" square/>
                            <Input onChange={this.onThumbnailsStateChange(1)} type="text" value={this.state.thumbnails[1]} placeholder="Thêm ảnh thumbnails của bạn" square/>
                            {
                                (this.state.thumbnails.length  > 0 && this.state.thumbnails[0]) && <img className="product-create-page__side__thumbnails__img" src={this.state.thumbnails[0]} />
                            }
                        </Box>
                        {/* Ảnh */}
                        <Box title="Ảnh chi tiết sản phẩm" errorText={this.state.errors && this.state.errors.images_detail ? this.state.errors.images_detail.msgVi : "" }>
                            <Input onChange={this.onImagesDetailStateChange} value={this.state.images_detail} type="text" placeholder="Ảnh chi tiết sản phẩm cách nhau bởi dấu ," square/>
                        </Box>
                    </div>
                </form>
            </Management>
        )
    }
}

export default ProductCreatePage;