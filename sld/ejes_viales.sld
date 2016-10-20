<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld"
        xmlns:sld="http://www.opengis.net/sld"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:gml="http://www.opengis.net/gml"
        version="1.0.0">
  <sld:UserLayer>
    <sld:Name>ejes_viales</sld:Name>
          <sld:LayerFeatureConstraints>
          <sld:FeatureTypeConstraint/>
      </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>Ejes Viales</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:Name>Entre 1:1 y 1:7000</sld:Name>
          <MaxScaleDenominator>7000</MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#505050</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        <sld:TextSymbolizer>
    <sld:Label>
    <ogc:PropertyName>nombre</ogc:PropertyName>
    </sld:Label>
    <sld:Font>
    <sld:CssParameter name="font-family">Arial</sld:CssParameter>
    <sld:CssParameter name="font-size">10.0</sld:CssParameter>
    <sld:CssParameter name="font-style">normal</sld:CssParameter>
    <sld:CssParameter name="font-weight">bold</sld:CssParameter>
    </sld:Font>
    <sld:LabelPlacement>
    <sld:LinePlacement/>
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
    <sld:CssParameter name="fill">#990000</sld:CssParameter>
    </sld:Fill>
     </sld:TextSymbolizer>
          </sld:Rule>
         </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:UserLayer>
</sld:StyledLayerDescriptor>