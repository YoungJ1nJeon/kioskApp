import React from 'react';

const Topping = ({ selectedItem}) => {

    console.log(selectedItem);

    return (
        <div className="addItem_wrap">
            <div className="addItem">
                <section className="modal_wrap">
                    <div className="h2_wrap">
                        <h2>토핑 모달입니다.</h2>
                    </div>
                    
                </section>
                
            </div>
        </div>
    );
};

export default Topping;
