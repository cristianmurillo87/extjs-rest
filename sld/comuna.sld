<?xml version="1.0" encoding="UTF-8"?><sld:UserStyle xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">
  <sld:Name>Comunas</sld:Name>
  <sld:FeatureTypeStyle>
    <sld:Rule>
    <sld:Name>Entre 1:1 y 1:10000</sld:Name>
    <MaxScaleDenominator>10000</MaxScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">5</sld:CssParameter>
          <sld:CssParameter name="stroke">#646464</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
    </sld:Rule>
  <sld:Rule>
    <sld:Name>Entre 1:10000 y 1:50000</sld:Name>
    <MinScaleDenominator>10000</MinScaleDenominator>
  <MaxScaleDenominator>50000</MaxScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">2</sld:CssParameter>
          <sld:CssParameter name="stroke">#646464</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
    </sld:Rule>
    <sld:Rule>
    <sld:Name>Hasta 1:50000</sld:Name>
    <MinScaleDenominator>50000</MinScaleDenominator>
      <sld:LineSymbolizer>
        <sld:Stroke>
          <sld:CssParameter name="stroke-width">2</sld:CssParameter>
          <sld:CssParameter name="stroke">#646464</sld:CssParameter>
        </sld:Stroke>
      </sld:LineSymbolizer>
      <sld:PolygonSymbolizer>
         <sld:Fill>
          <sld:CssParameter name="fill">#FEFEE9</sld:CssParameter>
        </sld:Fill>
      </sld:PolygonSymbolizer>
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
      <sld:CssParameter name="font-size">15</sld:CssParameter>
      <sld:CssParameter name="font-style">italic</sld:CssParameter>
      <sld:CssParameter name="font-weight">normal</sld:CssParameter>
     </sld:Font>
     <sld:LabelPlacement>
       <sld:PointPlacement/>
      </sld:LabelPlacement>
     <sld:Halo>
      <sld:Radius>
       <ogc:Literal>2</ogc:Literal>
      </sld:Radius>
       <sld:Fill>
         <sld:CssParameter name="fill">#FFFFEB</sld:CssParameter>
       </sld:Fill>
     </sld:Halo>
    <sld:Fill>
      <sld:CssParameter name="fill">#000000</sld:CssParameter>
    </sld:Fill>
     <sld:Priority>5000</sld:Priority>
     <sld:VendorOption name="group">true</sld:VendorOption>
     <VendorOption name="autoWrap">100</VendorOption>
    </sld:TextSymbolizer>
    </sld:Rule>
  </sld:FeatureTypeStyle>
</sld:UserStyle>