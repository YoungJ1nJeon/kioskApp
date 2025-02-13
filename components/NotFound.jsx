import React from 'react';
import { Link } from 'react-router-dom';  // Import Link component

const NotFound = () => {
    return (
        <>
            <div className='NotFound'>
                <h1 className="NFh1">요청하신 페이지를 찾을 수 없습니다.</h1>
                <p className="NFp">버그킹 페이지로 이동을 원하시면 <Link to="/BugKing">여기</Link>를 클릭하세요.</p>
            </div>
        </>
    );
};

export default NotFound;
