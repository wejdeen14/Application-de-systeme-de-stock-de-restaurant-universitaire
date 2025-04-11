import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
function ShowFacture() {
  const [facture, setFacture] = useState({});
  const pdfRef=useRef();
  const { idFac } = useParams();
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
useEffect(() => {
  const fetchFacture = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/factures/${idFac}`);
          setFacture(response.data);
      } catch (error) {
          console.error('Erreur lors de la récupération de la facture :', error);
      }
  };

  fetchFacture();
}, [idFac]);
  return (
    <div className="container">
            
    <div className="card-header" >
        <button className="btn btn-outline-info float-right" onClick={downloadPdf}>Télécharger PDF</button>
      
    </div>
<div className="card border" ref={pdfRef}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
{/* Logo à gauche */}
<img src="/bb.png" alt="Logo Gauche" style={{ width: '250px', height: 'auto',marginLeft:"30px" }} />
{/* Texte */}
<div>
    <h1 className="text-center mt-5 mb-3 text-stone-600 uppercase fw-bold">Ministère de l'Enseignement Supérieur Cité Universitaire 05 Septembre 1934 Moknine</h1>
    <h2 className="text-center mt-5 mb-3 fw-bold text-neutral-950" style={{ fontSize: "30px", fontFamily: "Lucida Calligraphy" }}>Facture</h2>
</div>
{/* Logo à droite */}
<img src="/oouc.png" alt="Logo Droite" style={{ width: '80px', height: 'auto',marginRight:"60px" }} />
</div>
  
    
    <div className="card-body">


        <div className=" " style={{marginLeft:"900px"}}>
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
                <div className="col-md-6" style={{marginRight: "auto", marginLeft: "0"}}>
                    <div className=" border-0 bg-gray-200">
                        <div className="card-body">
                            <b className="text-muted text-neutral-950">Date:</b>
                            <p className="text-uppercase">{facture.dateFac}</p>

                            <b className="text-muted text-neutral-900">Numéro Facture N°: # </b>
                            <p>{facture.idFac}</p>

                            {facture.liv && facture.liv.length > 0 ? (
    <div>
      
        <p className="text-left text-neutral-900">Fournisseur: {facture.liv[0].nomFor}</p>
        <p className="text-left text-muted text-neutral-900">E-mail fournisseur: {facture.liv[0].mail_for}</p>
        <p className="text-left text-muted text-neutral-900">Numéro Téléphone: {facture.liv[0].tel_for}</p>
    </div>
) : (
    <p>Pas de détails disponibles</p>
)}


                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr className="border-8 mt-40" style={{borderColor: "#0c4a6e"}} />

        <table className="table">
            <thead>
                <tr>
                    <th className="text-neutral-950 fw-bold uppercase">Id Bon de commande</th>
                    <th className="text-neutral-950 fw-bold uppercase">Date</th>
                    <th className="text-neutral-950 fw-bold uppercase">Montant</th>
                </tr>
            </thead>
            <tbody>
            {facture.liv && facture.liv.length > 0 ? (
    facture.liv.map((liv, idx) => (
        <tr key={idx}>
            <td>{liv.idLiv}</td>
            <td>{liv.date_liv}</td>
            <td>{liv.prix_totale}</td>
        </tr>
    ))
) : (
    <p>Pas de détails disponibles</p>
)}

            </tbody>
        </table>
        <b className='ml-0'> Montant Totale sans TVA  :</b> <p>{facture.prixFac}</p>

        <b className='ml-0'> Montant Totale avec  TVA  : </b> <p>{facture.prixTVA} </p>

        <p className='mt-20'> SIGNATURE </p>
    </div>
</div>

</div>
  )
}

export default ShowFacture