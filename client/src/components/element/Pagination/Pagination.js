import React from 'react';
import Button from '../Button/Button';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                previous: "prev",
                pageOne: this.props.page,
                pageTwo: this.props.page + 1,
                pageThree: this.props.page + 2,
                next: "next"
            }
        }
    }

    // handlingPagination(page, total) {
    //     if(page - 1 === 0) {
    //         this.setState({
    //             pagination: {
    //                 previous: null
    //             }
    //         })
    //     }
    //     if(page + 1 > total) {
    //         this.setState({
    //             pagination: {
    //                 next: null
    //             }
    //         })
    //     }
        
    //     if(page + 1 > this.state.pagination.pageTwo) {
    //         // pagination.pageOne = page + 0 <= total ? page + 0 : null;
    //         // pagination.pageTwo = page + 1 <= total ? page + 1 : null;
    //         // pagination.pageThree = page + 2 <= total ? page + 2 : null;
    //         this.setState({
    //             pagination: {
    //                 pageOne: page + 0 <= total ? page + 0 : null,
    //                 pageTwo: page + 1 <= total ? page + 1 : null,
    //                 pageTwo: page + 2 <= total ? page + 2 : null,
    //             }
    //         })
    //     }
    // }

    render() {
        let { onPage, page, total, onChange, onClick, width } = this.props;
        page = Number(page);
        onPage = Number(onPage);
        total = Number(total);
        let length = Math.ceil(total/onPage);

        return (
            <div className="pagination">
                <Button
                // className={`${page - 1 === 0 ? "d-none" : ""}`}
                onChange={onChange} 
                onClick={onClick(page - 1 > 0 ? page - 1 : page, onPage)} 
                style={{fontWeight: "normal", background: "white", color: "#4e73df",padding: "8px 10px", border: "1px solid #eaecf4", borderRadius: "5px 0 0 5px"}} 
                violet>Prev</Button>
                {
                    page + 0 <= length && <Button 
                    onChange={onChange} 
                    onClick={onClick( page + 0, onPage)} 
                    style={{fontWeight: "normal", background: "white", color: "#4e73df",padding: "8px 10px", border: "1px solid #eaecf4"}} 
                    violet> { page + 0 } </Button>    
                }
                {/* {
                    page + 1 <= length && <Button 
                    onChange={onChange} 
                    onClick={onClick( page + 1, onPage)} 
                    style={{fontWeight: "normal", background: "white", color: "#4e73df",padding: "8px 10px", border: "1px solid #eaecf4"}} 
                    violet> { page + 1 } </Button>
                }
                {
                    page + 2 <= length && <Button 
                    onChange={onChange} 
                    onClick={onClick( page + 2, onPage)} 
                    style={{fontWeight: "normal", background: "white", color: "#4e73df",padding: "8px 10px", border: "1px solid #eaecf4"}} 
                    violet> { page + 2} </Button>
                } */}
                <Button
                // className={`${page + 1 > length ? "d-none" : ""}`}
                onChange={onChange} 
                onClick={onClick(page + 1 <= length ? page + 1 : page, onPage)} 
                style={{fontWeight: "normal", background: "white", color: "#4e73df",padding: "8px 10px", border: "1px solid #eaecf4",borderRadius: "0 5px 5px 0"}} 
                violet>Next</Button>
            </div>
        )
    }
}

export default Pagination;