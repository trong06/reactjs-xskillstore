import React from 'react'
import Color from '../../../components/element/Color/Color';
import Box from '../../../components/element/Box/Box';
import Management from '../../../components/layout/Common/Management';

class SystemColorPage extends React.Component {
    render() {
        return (
            <Management>
                <Box title="Table Colors">
                    <div style={{
                        display: "grid", 
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: "15px"}}>
                        <Color colorName="Dark" colorCode="#303030" />
                        <Color colorName="light" colorCode="white" />
                        <Color colorName="light-violet" colorCode="#f8f9fc" />
                        <Color colorName="Light Grey" colorCode="#dbdbdb" />
                        <Color colorName="light-grey-light" colorCode="#f1f1f1" />
                        <Color colorName="grey-custom-1" colorCode="#b7b9cc" />
                        <Color colorName="grey-custom-2" colorCode="#eaecf4" />
                        <Color colorName="orange" colorCode="#f15e2c" />
                        <Color colorName="grey" colorCode="#8a8a8a" />
                        <Color colorName="dark-grey" colorCode="#4c4c4c" />
                        <Color colorName="red" colorCode="red" />
                        <Color colorName="success" colorCode="#28a745" />
                        <Color colorName="violet" colorCode="#4e73df" />
                        <Color colorName="violet-gradient" colorCode="linear-gradient(180deg,#4e73df 10%,#224abe 100%)" />
                    </div>
                </Box>
            </Management>
        )
    }
}

export default SystemColorPage;