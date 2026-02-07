import { useEffect, useState } from "react"
export default function ProduitsList(){
    const[produits , setProduits] = useState([])
    const [ProduitsFiltrer , setProduitsFiltrer] = useState([])
    const [inputvalue , setinputvalue] = useState("");
    const [categories , setcategories] = useState([]);
    useEffect(()=>{
        getproducts();
        getcategories();
    },[]);
    const reset = ()=>{
        setProduitsFiltrer([]);
    }
    const getcategories = ()=>{
        fetch("https://fakestoreapi.com/products/categories")
        .then(res=>res.json())
        .then(res=>setcategories(res));
    }
    const Changed = (e)=>{
        setinputvalue(e.target.value);
    }
    const filtrer = (e)=>{
        e.preventDefault();
        const helparray = produits.filter((product)=>{
            
            if(product.title.toLowerCase().includes(inputvalue.toLowerCase()) || product.description.toLowerCase().includes(inputvalue.toLowerCase()) || product.category.toLowerCase().includes(inputvalue.toLowerCase())){
                return product;
            }
        })
        setProduitsFiltrer(helparray);
        
        
    }
    const getproducts = ()=>{
        fetch("https://fakestoreapi.com/products/")
                         .then(res=>res.json())
                         .then(res=>setProduits(res)) ; 
    }
    const displayproducts = (produits)=>{
        if(produits.length > 0){
            return produits.map((produit)=>{
                
                return (
                    <tr key={produit.id}>
                        <td>{produit.id}</td>
                        <td>{produit.title}</td>
                        <td>{produit.category}</td>
                        <td>{produit.description}</td>
                        <td><img src={produit.image} alt="" style={{width: "100px" , height : "200px"}} /></td>
                        <td>{produit.price}</td>
                        
                            
                        <td className="text-center">
                            <span className={produit.rating.rate> 3 ? "badge bg-secondary bg-success text-center" : "badge bg-secondary bg-danger text-center"}>
                                {produit.rating.rate}
                            </span>
                            
                        </td>
                        
                        
                    </tr>
                )
            })
        }
        else{
            return (
                <tr>
                    <td colSpan={7} className="text-center">NO Products </td>
                </tr>
                
            )
        }
        
    }
    const displaycategories = ()=>{
        
        return categories.map((category , index)=>{
            
            return (
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        value={category}
                        class="btn btn-secondary"
                        key={index}
                        style={{marginRight:"15px" , marginLeft:"15px"}}
                        onClick={filtrerCategories}
                    >
                        {category}
                    </button>
                </div>
                
            
            )
        }) 
    }
    const filtrerCategories = (e)=>{
        e.preventDefault();
        const helparray = produits.filter((product)=>{
            
            if(product.category.toLowerCase().includes(e.target.value.toLowerCase())){
                return product;
            }
        })
        setProduitsFiltrer(helparray);
    }
    return(
        <>
            <div className="mb-3">
                <h3 className="text-dark m-3">Filtrer</h3>
                <input
                    type="text"
                    
                    id="search"
                    className="form-control m-3"
                    style={{width:"20%"}}
                    aria-describedby="helpId"
                    onChange={Changed}
                />
                <input
                   
                    id="chercher"
                    className="btn btn-primary  m-3 mt-2"
                    type="button"
                    value="Chercher"
                    onClick={filtrer}
                />
                <input
                   
                    
                    className="btn btn-primary  m-3 mt-2"
                    type="button"
                    value="Restart"
                    onClick={reset}
                />
            </div>
            <div>
                <h3 className="text-dark m-3">Categories</h3>
                
                <div className="btn-group">
                    {displaycategories()}
                </div>
                
                
            </div>
            <h1 className="text-dark m-3">Liste des produits :</h1>
            <div
                className="table-special"
            >
                <table
                    className="table table-primary table-hover"
                >
                    <thead className="table-light text-center">
                        
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Catégorie</th>
                            <th>Déscription</th>
                            <th>Image</th>
                            <th>Prix</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {ProduitsFiltrer.length <= 0 ? displayproducts(produits) : displayproducts(ProduitsFiltrer)}
                    </tbody>
                </table>
            </div>
            

        </>
    )
}