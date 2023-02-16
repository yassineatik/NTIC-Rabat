import React, { useRef, useState } from "react";
import Header from "../../components/layout/header/header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "../../components/layout/footer/footer";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import * as Display from "../../services/displayAlert";
import LoadingButton from "@mui/lab/LoadingButton";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPassword = () => {
    const email = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const handleResetPassword = async () => {
        try {
            setLoading(true);
            const link = process.env.SERVER_PUBLIC_API_URL;
            const res: any = await fetch(`${link}/auth/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.current?.value,
                }),
            });
            if (res.status === 200) {
                Display.pushSuccess("Un email vous a été envoyé");
                setLoading(false);
            } else if (res.status === 401) {
                Display.pushFailure("Email introuvable");
                setLoading(false);
            } else {
                Display.pushFailure("Une erreur est survenue");
                setLoading(false);
            }
        } catch (err: any) {
            Display.pushFailure("Une erreur est survenue " + err.message);
            setLoading(false);
        }
    };
    return (
        <div className="ForgotPassword">
            <div className="Container">
                <div className="Form">
                    <div className="FormTitle">
                        <h1>
                            Récupérez votre accès à <span>Ntic Connect</span>
                        </h1>

                        <p>
                            <p>
                                Entrez votre adresse email enregistrée avec
                                votre compte Ntic Rabat pour recevoir un lien de
                                réinitialisation de mot de passe. Nous vous
                                aiderons à retrouver l'accès à votre compte en
                                toute sécurité.
                            </p>
                        </p>
                    </div>
                    <div className="Form-group">
                        <div className="Input Username">
                            <div className="Input-icon">
                                <EmailIcon />
                            </div>
                            <input
                                type="email"
                                ref={email}
                                className="form-control"
                                placeholder="Addresse Email"
                                required
                                // if the user taps on enter, the form will be submitted
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleResetPassword();
                                    }
                                }}
                            ></input>
                        </div>
                    </div>
                    {loading ? (
                        <LoadingButton
                            variant="contained"
                            loading
                            loadingPosition="center"
                            className="btnPrimary Loading"
                        />
                    ) : (
                        <Button
                            variant="text"
                            className="btnPrimary"
                            onClick={handleResetPassword}
                        >
                            réinitialiser le mot de passe
                        </Button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
