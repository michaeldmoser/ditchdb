from qgis.core import QgsApplication, QgsProject, QgsVectorLayer, QgsCoordinateTransform

from ditchdb.models import OrionProperty


class DistrictMarker:
    """Finds all properties in a district and marks them as such."""

    def __init__(self, district, parcels):
        """Initialize the class."""
        QgsApplication.setPrefixPath("/usr", True)  # TODO: Make this configurable
        self.__qgs = QgsApplication([], False)
        self.__qgs.initQgis()

        self.district = QgsVectorLayer(district, 'boundaries', 'ogr')
        self.parcels = QgsVectorLayer(parcels, 'Parcels', 'ogr')

        self.xform = QgsCoordinateTransform(self.district.sourceCrs(), self.parcels.sourceCrs(), QgsProject.instance())

    def mark(self):
        """Mark all parcels in the district."""
        boundaries = [self.__get_transformed_geometry(boundary) for boundary in self.district.getFeatures()]

        intersecting_parcels = [self.__get_intersecting_parcels(
            boundary) for boundary in boundaries]

        parcels = self.__flatten_parcel_list(intersecting_parcels)

        for parcel in parcels:
            self.__update_property(parcel)

    def __get_transformed_geometry(self, boundary):
        """Returns transformed geometry for a boundary"""
        boundary_geometry = boundary.geometry()
        boundary_geometry.transform(self.xform)
        boundary.setGeometry(boundary_geometry)
        return boundary.geometry()

    def __get_intersecting_parcels(self, boundary):
        """Returns intersecting parcels for a boundary"""
        return [
            parcel
            for parcel in self.parcels.getFeatures()
            if boundary.intersects(parcel.geometry()) and parcel['PropertyID']
        ]

    def __update_property(self, parcel):
        """Updates a property as being in the district"""
        OrionProperty.objects \
            .filter(property_id=int(parcel['PropertyID'])) \
            .update(indistrict=True)

    def __flatten_parcel_list(self, parcels):
        """Flatten a list of parcels."""
        return [parcel for sublist in parcels for parcel in sublist]

