/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.services;

import edu.eci.cosw.samples.model.Producto;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class ServicesFacade {
       
    private static final Map<Integer,Producto> dummyProductsDataMap=new Hashtable<>();
    
    static{
        for (int i=0;i<20;i++){
            Producto p=new Producto(i,"Producto "+i,100*i);
            dummyProductsDataMap.put(p.getIdproducto(),p);
        }
    }
    
    public void addNewProduct(Producto p){
        dummyProductsDataMap.put(p.getIdproducto(),p);
    }
    
    public List<Producto> getAllProducts(){
        return new LinkedList(dummyProductsDataMap.values());
    }
    
    public Producto getProduct(int idprod){
        return dummyProductsDataMap.get(idprod);
    }
    
}
