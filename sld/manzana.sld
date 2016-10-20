<?xml version="1.0" encoding="UTF-8"?><sld:UserStyle xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <sld:Name>Manzanas</sld:Name>
  <sld:FeatureTypeStyle>
    <sld:Name>name</sld:Name>
    <sld:Rule>
  <sld:Name> Hasta 1:2500</sld:Name>
  <sld:MaxScaleDenominator>2500</sld:MaxScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke">#999999</sld:CssParameter>
          <sld:CssParameter name="stroke-width">4</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
      <sld:PolygonSymbolizer>
         <sld:Fill>
          <sld:CssParameter name="fill">#F8F8F8</sld:CssParameter>
          <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
        </sld:Fill>
     </sld:PolygonSymbolizer>
          <sld:TextSymbolizer>
        <sld:Geometry>
          <ogc:Function name="centroid">
            <ogc:PropertyName>the_geom</ogc:PropertyName>
          </ogc:Function>
        </sld:Geometry>
      <sld:Label>
        <ogc:PropertyName>cod_manzan</ogc:PropertyName>
      </sld:Label>
      <sld:Font>
        <sld:CssParameter name="font-family">Arial</sld:CssParameter>
        <sld:CssParameter name="font-size">10</sld:CssParameter>
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
      <VendorOption name="autoWrap">100</VendorOption>
      <VendorOption name="maxDisplacement">100</VendorOption>
     </sld:TextSymbolizer> 
    </sld:Rule>
   <sld:Rule>
   <sld:Name>Entre 1:2500 y 1:12000</sld:Name>
    <sld:MinScaleDenominator>2500</sld:MinScaleDenominator>
  <sld:MaxScaleDenominator>12000</sld:MaxScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke">#999999</sld:CssParameter>
          <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
    </sld:Rule>
     <sld:Rule>
   <sld:Name>Menor a 1:12000</sld:Name>
    <sld:MinScaleDenominator>12000</sld:MinScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke">#808080</sld:CssParameter>
          <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
    </sld:Rule>
  </sld:FeatureTypeStyle>
</sld:UserStyle>