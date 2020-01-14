import React from 'react'
import AuthorImg from '../../images/logo-test.png'

class ModalImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            image: null
        }

        this.onHandlingToggle = this.onHandlingToggle.bind(this);
        this.onHandingHideModal = this.onHandingHideModal.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onHandlingToggle(event) {
        this.setState({
            toggle: true,
            image: event.target.src
        });   
    }

    onHandingHideModal() {
        this.setState({
            toggle: false,
            image: null
        });
    }

    onKeyUp(event) {
        if(event.keyCode === 27) {
            this.setState({
                toggle: false,
                image: null
            })
        }
    }

    componentDidMount() {
        window.addEventListener("keyup", this.onKeyUp);
    }

    componentWillUnmount() {
        this.setState({
            image: null,
            toggle: false
        })
        window.removeEventListener("keyup", this.onKeyUp);
    }

    render() {
        const { image, heightImg } = this.props;
        return (
            <div className="modal-image">
                <img onClick={this.onHandlingToggle} height={heightImg} className="modal-image__image" src={image} />
                <div onClick={this.onHandingHideModal} className={`modal-image__modal ${this.state.toggle ? "modal-image--active" : "" }`}>
                    <div className="modal-image__modal__content">
                        <img src={this.state.image} className="modal-image__modal__content__img" />
                        <div className="modal-image__modal__content__detail">
                            <span className="modal-image__modal__content__detail__author">
                                <img src={AuthorImg} className="modal-image__modal__content__detail__author__child" />
                                <span className="modal-image__modal__content__detail__author__name">StoreT</span>
                            </span>
                            <p className="modal-image__modal__content__detail__para">
                                {/* <span>Tags: </span> #ananas #burtus */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ModalImage.defaultProps = {
    image: "https://via.placeholder.com/400"
}

export default ModalImage;