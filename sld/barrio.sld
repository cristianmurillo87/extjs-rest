<?xml version="1.0" encoding="UTF-8"?><sld:UserStyle xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <sld:Name>Barrio</sld:Name>
  <sld:FeatureTypeStyle>
    <sld:Rule>
     <sld:Name> Hasta 1:25000</sld:Name>
      <sld:MinScaleDenominator>25000</sld:MinScaleDenominator>
       <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">0</sld:CssParameter>
          <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
    </sld:Rule>
    <sld:Rule>
     <sld:Name> Entre 1:5000 y 1:25000</sld:Name>
      <sld:MinScaleDenominator>8000</sld:MinScaleDenominator>
      <sld:MaxScaleDenominator>25000</sld:MaxScaleDenominator>
       <sld:LineSymbolizer>
        <sld:Stroke>
            <sld:CssParameter name="stroke-width">0</sld:CssParameter>
           <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
          <sld:TextSymbolizer>
        <sld:Geometry>
          <ogc:Function name="centroid">
            <ogc:PropertyName>the_geom</ogc:PropertyName>
          </ogc:Function>
        </sld:Geometry>
      <sld:Label>
        <ogc:PropertyName>nombre</ogc:PropertyName>
      </sld:Label>
      <sld:Font>
        <sld:CssParameter name="font-family">Arial</sld:CssParameter>
        <sld:CssParameter name="font-size">11</sld:CssParameter>
        <sld:CssParameter name="font-style">normal</sld:CssParameter>
        <sld:CssParameter name="font-weight">bold</sld:CssParameter>
      </sld:Font>
      <sld:LabelPlacement>
        <PointPlacement>
             <AnchorPoint>
               <AnchorPointX>0.5</AnchorPointX>
               <AnchorPointY>0.5</AnchorPointY>
             </AnchorPoint>
         </PointPlacement>
      </sld:LabelPlacement>
      <sld:Halo>
        <sld:Radius>
          <ogc:Literal>2</ogc:Literal>
        </sld:Radius>
        <sld:Fill>
          <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
        </sld:Fill>
      </sld:Halo>
      <sld:Fill>
        <sld:CssParameter name="fill">#000000</sld:CssParameter>
      </sld:Fill>
      <sld:Priority>500</sld:Priority>
      <VendorOption name="autoWrap">60</VendorOption>
      <VendorOption name="maxDisplacement">100</VendorOption>
     </sld:TextSymbolizer>
    </sld:Rule>
   <sld:Rule>
     <sld:Name> Entre 1:5000 y 1:8000</sld:Name>
      <sld:MinScaleDenominator>5000</sld:MinScaleDenominator>
      <sld:MaxScaleDenominator>8100</sld:MaxScaleDenominator>
       <sld:LineSymbolizer>
        <sld:Stroke>
            <CssParameter name="stroke">#D984EE</CssParameter>
            <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
            <CssParameter name="stroke-dasharray">10 10</CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
          <sld:TextSymbolizer>
        <sld:Geometry>
          <ogc:Function name="centroid">
            <ogc:PropertyName>the_geom</ogc:PropertyName>
          </ogc:Function>
        </sld:Geometry>
      <sld:Label>
        <ogc:PropertyName>nombre</ogc:PropertyName>
      </sld:Label>
      <sld:Font>
        <sld:CssParameter name="font-family">Arial</sld:CssParameter>
        <sld:CssParameter name="font-size">11</sld:CssParameter>
        <sld:CssParameter name="font-style">normal</sld:CssParameter>
        <sld:CssParameter name="font-weight">bold</sld:CssParameter>
      </sld:Font>
      <sld:LabelPlacement>
        <PointPlacement>
             <AnchorPoint>
               <AnchorPointX>0.5</AnchorPointX>
               <AnchorPointY>0.5</AnchorPointY>
             </AnchorPoint>
         </PointPlacement>
      </sld:LabelPlacement>
      <sld:Halo>
        <sld:Radius>
          <ogc:Literal>2</ogc:Literal>
        </sld:Radius>
        <sld:Fill>
          <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
        </sld:Fill>
      </sld:Halo>
      <sld:Fill>
        <sld:CssParameter name="fill">#000000</sld:CssParameter>
      </sld:Fill>
      <sld:Priority>500</sld:Priority>
      <VendorOption name="autoWrap">60</VendorOption>
      <VendorOption name="maxDisplacement">100</VendorOption>
     </sld:TextSymbolizer>
    </sld:Rule>
    <sld:Rule>
     <sld:Name> Hasta 1:5000</sld:Name>
      <sld:MaxScaleDenominator>5000</sld:MaxScaleDenominator>
       <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">0</sld:CssParameter>
           <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
     <sld:TextSymbolizer>
        <sld:Geometry>
          <ogc:Function name="centroid">
            <ogc:PropertyName>the_geom</ogc:PropertyName>
          </ogc:Function>
        </sld:Geometry>
      <sld:Label>
        <ogc:PropertyName>nombre</ogc:PropertyName>
      </sld:Label>
      <sld:Font>
        <sld:CssParameter name="font-family">Arial</sld:CssParameter>
        <sld:CssParameter name="font-size">14</sld:CssParameter>
        <sld:CssParameter name="font-style">normal</sld:CssParameter>
        <sld:CssParameter name="font-weight">bold</sld:CssParameter>
      </sld:Font>
      <sld:LabelPlacement>
        <PointPlacement>
             <AnchorPoint>
               <AnchorPointX>0.5</AnchorPointX>
               <AnchorPointY>0.5</AnchorPointY>
             </AnchorPoint>
         </PointPlacement>
      </sld:LabelPlacement>
      <sld:Halo>
        <sld:Radius>
          <ogc:Literal>2</ogc:Literal>
        </sld:Radius>
        <sld:Fill>
          <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
        </sld:Fill>
      </sld:Halo>
      <sld:Fill>
        <sld:CssParameter name="fill">#000000</sld:CssParameter>
      </sld:Fill>
      <sld:Priority>500</sld:Priority>
      <VendorOption name="autoWrap">200</VendorOption>
      <VendorOption name="maxDisplacement">100</VendorOption>
     </sld:TextSymbolizer>
    </sld:Rule>      
 </sld:FeatureTypeStyle>
</sld:UserStyle>