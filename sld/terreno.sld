<?xml version="1.0" encoding="UTF-8"?><sld:UserStyle xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <sld:Name>Terrenos</sld:Name>
  <sld:FeatureTypeStyle>
     <sld:Rule>
     <sld:Name>Entre 1:1000 y 1:5000</sld:Name>
      <sld:MaxScaleDenominator>1000</sld:MaxScaleDenominator>      
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">1</sld:CssParameter>
          <sld:CssParameter name="stroke">#1a1a1a</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
      <sld:TextSymbolizer>
          <sld:Geometry>
           <ogc:Function name="centroid">
           <ogc:PropertyName>the_geom</ogc:PropertyName>
         </ogc:Function>
        </sld:Geometry>
       <sld:Label>
         <ogc:Function name="strSubstring">
           <ogc:PropertyName>cod_predio</ogc:PropertyName>
            <ogc:Literal>10</ogc:Literal>
            <ogc:Literal>14</ogc:Literal>
         </ogc:Function>
       </sld:Label>
       <sld:Font>
        <sld:CssParameter name="font-family">Arial</sld:CssParameter>
        <sld:CssParameter name="font-size">8.5</sld:CssParameter>
        <sld:CssParameter name="font-style">bold</sld:CssParameter>
        <sld:CssParameter name="font-weight">normal</sld:CssParameter>
       </sld:Font>
      <sld:LabelPlacement>
        <PointPlacement>
         <AnchorPoint>
          <AnchorPointX>0.5</AnchorPointX>
          <AnchorPointY>0.5</AnchorPointY>
         </AnchorPoint>
        </PointPlacement>
      </sld:LabelPlacement>
      <!--sld:Halo>
        <sld:Radius>
          <ogc:Literal>1</ogc:Literal>
        </sld:Radius>
        <sld:Fill>
          <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
        </sld:Fill>
      </sld:Halo-->
      <sld:Fill>
        <sld:CssParameter name="fill">#000000</sld:CssParameter>
      </sld:Fill>
       <sld:Priority>500</sld:Priority>
       <VendorOption name="autoWrap">50</VendorOption>
       <VendorOption name="polygonAlign">ortho</VendorOption>
      </sld:TextSymbolizer>  
     </sld:Rule>
     <sld:Rule>
     <sld:Name>Mayor a 1:1000</sld:Name>
      <sld:MinScaleDenominator>1000</sld:MinScaleDenominator> 
      <sld:MaxScaleDenominator>5000</sld:MaxScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
          <sld:CssParameter name="stroke">#1a1a1a</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
    </sld:Rule>
  </sld:FeatureTypeStyle>
</sld:UserStyle>