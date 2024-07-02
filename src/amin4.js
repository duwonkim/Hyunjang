import React from 'react';
import aaImage from './aa.jpeg';
import './Amin4.css'; // CSS 파일을 가져옵니다.

const Amin4 = () => {
    return (
        <div className="container">
            <div className="image-container">
                <img src={aaImage} alt="노트에 기록하는 모습" className="hero-image" />
            </div>
            <h1>회사개요</h1>
            <hr />
            <h2>대표이사: 김두원</h2>
            <hr />
            <h2>설립목적</h2>
            <p>
                설립목적 본 현장어때(주)는 건설일용직의 불안정한 고용형태와 건설기업의 안정적인 인부고용을 위하여
                설립되었습니다. 본 현장어때(주)는 인부님과 건설기업의 중간관계자의 역할로 모두의 이야기를 귀담아 듣고
                보다 나은 건설현장의 고용형태를 추구하기 위해 노력하겠습니다. 또한 건설 일용직이 아닌 단순 단기 노동이 필요한
                사람은 누구나 이용할 수 있으며 인부들은 본업이 아니더라도 서브로 추가적인 일을 통해 수익을 올리는 것을
                추구합니다.
            </p>
            <h2>사업내용</h2>
            <p>
                사업내용 인터넷 통신망을 통한 직업소개소
            </p>
            <hr />
            <h2>문의사항</h2>
            <p>
                추가적으로 궁금하신 점은 QnA와 회사메일을 이용해 주시면 감사하겠습니다.
            </p>
            <h2>찾아오시는 길</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12662.82682584954!2d126.7208545!3d37.491247!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7c465ba931ed%3A0x23b1e1147d0cb66!2z67aA7Y-J7Jet!5e0!3m2!1sko!2skr!4v1716791147782!5m2!1sko!2skr"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default Amin4;
