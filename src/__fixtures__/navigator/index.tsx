import React, { memo, useEffect, useRef, useState } from "react"
import { ArrowDropDown } from "@material-ui/icons"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Button from "@material-ui/core/Button"
import Menu from "../menu"
import Logo from "../logo"
import { NavLink } from "react-router-dom"
import { routes, authRoute } from "../layout/routeConfig"
import "./style.css"
import { localState } from ".."
import { useTranslation } from "react-i18next"
import { useReactiveVar } from "@apollo/client"


type lang = "Tiếng Việt" | "English"
type LangMap = {
    [key in lang]: "vi" | "en"
}
const langMap: LangMap = {
    "English": "en",
    "Tiếng Việt": "vi"
}

function Navigator() {

    // refs
    const userMenuRef = useRef<any>()
    const langMenuRef = useRef<any>()

    // translation
    const { t, i18n } = useTranslation()

    const [curLang, setLang] = useState<lang>("Tiếng Việt")

    useEffect(() => {
        i18n.changeLanguage(langMap[curLang])
    }, [curLang, i18n])

    const { isSignedIn } = useReactiveVar(localState)

    function toggleMenu(which: React.MutableRefObject<any>, type: "open" | "close") {
        (which.current as HTMLElement).classList[type === "open" ? "remove" : "add"]("hidden")
    }

    const userMenuVales = [
        {
            display: t("signout")
        },
        {
            display: t("my profile")
        }
    ]

    const langValues: {
        display: React.ReactNode;
        returnVal: lang;
    }[] = [
            {
                display: <p className="text-xs">Tiếng Việt</p>,
                returnVal: "Tiếng Việt"
            },
            {
                display: <p className="text-xs">English</p>,
                returnVal: "English"
            }
        ]

    return (
        <div className="flex flex-no-wrap items-center py-1 bg-white pr-4 pl-10 fixed top-0 left-0 w-full z-20 shadow-xs justify-between">
            <a href="/">
                <Logo />
            </a>
            <div className="flex items-center relative">
                <div className="mr-5 sm:hidden">
                    {Object.values(routes).map((nav, idx) => {
                        return (
                            <NavLink
                                exact={true}
                                to={nav.path}
                                key={idx}
                                className={`text-gray-700 inline cursor-pointer text-sm font-medium leading-5 float-left px-2 py-2 hover:text-gray-600 transition-colors duration-200`}
                                activeClassName="text_blue_700"
                            >
                                {t(nav.i18Name)}
                            </NavLink>
                        )
                    })}
                </div>
                {!isSignedIn ? (
                    <div className="relative mr-2">
                        <ClickAwayListener onClickAway={() => toggleMenu(userMenuRef, "close")}>
                            <div className="flex items-center cursor-pointer" onClick={() => toggleMenu(userMenuRef, "open")}>
                                <div className="border-2 border-solid rounded-full border-gray-200 flex-shrink-0 overflow-hidden w-8 h-8 text-center mr-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/b0/Avatar-Teaser-Poster.jpg/220px-Avatar-Teaser-Poster.jpg" alt="Phuc nguyen" />
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="mr-1 text-sm leading-5">Nguyen Van Phuc</span>
                                    <ArrowDropDown fontSize="small" />
                                </div>
                            </div>
                        </ClickAwayListener>
                        <Menu
                            addClass="hidden w-full top-full"
                            values={userMenuVales}
                            giveValue={console.log}
                            refer={userMenuRef}
                        />
                    </div>
                ) : (
                        <NavLink
                            to={authRoute.path}
                            exact={true}
                            className="mr-2"
                        >
                            <Button
                                color="primary"
                                size="small"
                                variant="contained"
                                disableElevation={true}
                            >
                                {t("login")}
                            </Button>
                        </NavLink>
                    )
                }
                <div className="relative" onClick={() => toggleMenu(langMenuRef, "open")}>
                    <ClickAwayListener onClickAway={() => toggleMenu(langMenuRef, "close")}>
                        <div
                            className="p-2 cursor-pointer text-gray-600 text-xs flex items-center"
                        >
                            <img className="w-4 h-auto mr-1" src={curLang === "Tiếng Việt" ? "/static/image/vietnam.svg" : "/static/image/united-kingdom.svg"} alt="flag"/>
                            <p>{curLang}</p>
                        </div>
                    </ClickAwayListener>
                    <Menu
                        addClass="hidden right-0"
                        values={langValues}
                        refer={langMenuRef}
                        giveValue={setLang}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Navigator)
