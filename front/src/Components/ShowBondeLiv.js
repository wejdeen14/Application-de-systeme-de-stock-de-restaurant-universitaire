import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ShowBondeLiv() {
    const { id_liv } = useParams();
    const [bondeLivraison, setBondeLivraison] = useState({});
    const pdfRef = useRef();

    useEffect(() => {
        const fetchBondeLivraison = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/liv/${id_liv}`);
                setBondeLivraison(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la bonde de livraison :', error);
            }
        };

        fetchBondeLivraison();
    }, [id_liv]);

    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('bondecommande.pdf');
        });
    };

    const premierFournisseur = bondeLivraison.livDetail && bondeLivraison.livDetail.length > 0 ? bondeLivraison.livDetail[0] : null;

    return (
        <div className="container">
            <div className="card-header">
                <button className="btn btn-outline-info float-right" onClick={downloadPdf}>Télécharger PDF</button>
            </div>
            <div className="card border" ref={pdfRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <img src="/bb.png" alt="Logo Gauche" style={{ width: '250px', height: 'auto', marginLeft: "30px" }} />
                    <div>
                        <h1 className="text-center mt-5 mb-3 text-stone-600 uppercase fw-bold">Ministère de l'Enseignement Supérieur Cité Universitaire 05 Septembre 1934 Moknine</h1>
                        <h2 className="text-center mt-5 mb-3 fw-bold text-neutral-950" style={{ fontSize: "30px", fontFamily: "Lucida Calligraphy" }}>Bon de commande Recu</h2>
                    </div>
                    <img src="/oouc.png" alt="Logo Droite" style={{ width: '80px', height: 'auto', marginRight: "60px" }} />
                </div>
                <div className="card-body">
                    <div className=" " style={{ marginLeft: "900px" }}>
                        <div>
                            <b className="text-neutral-950 fw-bold uppercase"> Destinataire</b>
                        </div>
                        <div>
                            <b className="text-muted"> Adresse: Rue Mohamed Karkoub Moknine 5050</b>
                        </div>
                        <div>
                            <b className="text-muted"> Tel: 73 413 746 Fax: 73 435 846</b>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6" style={{ marginRight: "auto", marginLeft: "0" }}>
                                <div className=" border-0 bg-gray-200">
                                    <div className="card-body">
                                        <b className="text-muted text-neutral-950">Date:</b>
                                        <p className="text-uppercase">{bondeLivraison.date_liv}</p>

                                        <b className="text-muted text-neutral-900">Bon de commande N°: # </b>
                                        <p>{bondeLivraison.id_liv}</p>

                                        {premierFournisseur && (
                                            <div key={premierFournisseur.id}>
                                                <p className="text-left text-neutral-900">Fournisseur: {premierFournisseur.nom_for}</p>
                                                <p className="text-left text-muted text-neutral-900">E-mail fournisseur: {premierFournisseur.mail_for}</p>
                                                <p className="text-left text-muted text-neutral-900">Numéro Téléphone:{premierFournisseur.tel_for}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-8 mt-40" style={{ borderColor: "#0c4a6e" }} />

                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-neutral-950 fw-bold uppercase">Designation</th>
                                <th className="text-neutral-950 fw-bold uppercase">Quantité</th>
                                <th className="text-neutral-950 fw-bold uppercase">Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bondeLivraison.livDetail && bondeLivraison.livDetail.map((detail, idx) => (
                                <tr key={idx}>
                                    <td>{detail.nomCategorie}: {detail.nomProd}</td>
                                    <td>{detail.qte} {detail.unite}</td>
                                    <td>{detail.prix_unitaire}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className='ml-0'> Montant Totale : {bondeLivraison.prix_totale} </p>

                    <p className='mt-20'> SIGNATURE </p>
                </div>
            </div>
        </div>
    );
}

export default ShowBondeLiv;
