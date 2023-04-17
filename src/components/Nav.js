import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

const Nav = () => {

    const initialUserData = localStorage.getItem("userData") ?
        JSON.parse(localStorage.getItem('userData')) : {};
    //로컬스토리지에 userData가 있으면 로컬스토리지에 저장되어있는
    // userData를 json 파싱해서 자기고 오고 없다면 빈객체로 받는다
    // 후에 userData useState에 값을집어넣음
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();
    console.log(pathname);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [userData, setUserData] = useState({ initialUserData });


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (pathname === '/')
                    navigate("/main");
            } else {
                navigate("/");
            }
        })
    }, [auth, navigate, pathname])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) //null값이라면 랜더링되고 한번만더 실행


    console.log("useLocation.search", useLocation().search)

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value); //state를 계속 바꿔주는
        console.log(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

    const handleAuth = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                setUserData(result.user);
                localStorage.setItem("userData", JSON.stringify(result.user))
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUserData({}); //로그아웃되고 빈객체로 만듦
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <NavWrapper show={show}>
            <Logo>
                <img
                    alt='Disney plus logo'
                    src='/images/logo.svg'
                    onClick={() => window.location.href = "/"}
                />
            </Logo>

            {/* /된곳이 <Login> */}
            {pathname === "/" ?
                (<Login onClick={handleAuth}>Login</Login>) :
                <>
                    <Input
                        value={searchValue}
                        onChange={handleChange}
                        className='nav__input'
                        type="text"
                        placeholder='검색해주세요'
                    />
                    <SignOut>
                        <UserImg src={userData.photoURL} alt={userData.diaplayName} />
                        <DropDown>
                            <span onClick={handleSignOut}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </>
            }
        </NavWrapper>
    )
}

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
`;


const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    color: white;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;


const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0,0,0,0.582);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: 1px solid lightgray;
`

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${props => props.show ? "#090b13" : "transparent"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`

export default Nav