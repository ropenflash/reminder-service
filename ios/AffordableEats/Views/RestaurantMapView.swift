import MapKit
import SwiftUI

struct RestaurantMapView: View {
    @EnvironmentObject private var store: RestaurantStore
    @State private var isAddingRestaurant = false
    @State private var cameraPosition: MapCameraPosition = .region(
        MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 37.7875, longitude: -122.4040),
            span: MKCoordinateSpan(latitudeDelta: 0.025, longitudeDelta: 0.025)
        )
    )

    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                Map(position: $cameraPosition) {
                    ForEach(store.filteredRestaurants) { restaurant in
                        Annotation(restaurant.name, coordinate: restaurant.coordinate) {
                            VStack(spacing: 4) {
                                Text(priceLabel(for: restaurant.averageMealPrice))
                                    .font(.caption.bold())
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(.green.gradient, in: Capsule())
                                    .foregroundStyle(.white)
                                Image(systemName: "fork.knife.circle.fill")
                                    .font(.title)
                                    .foregroundStyle(.orange)
                            }
                            .accessibilityLabel("\(restaurant.name), average meal \(priceLabel(for: restaurant.averageMealPrice))")
                        }
                    }
                }
                .ignoresSafeArea(edges: .bottom)

                RestaurantFilterPanel()
                    .padding()
                    .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
                    .padding()
            }
            .navigationTitle("Affordable Eats")
            .searchable(text: $store.searchText, prompt: "Search cuisine or restaurant")
            .toolbar {
                Button {
                    isAddingRestaurant = true
                } label: {
                    Label("Add Restaurant", systemImage: "plus")
                }
            }
            .sheet(isPresented: $isAddingRestaurant) {
                AddRestaurantView()
            }
        }
    }

    private func priceLabel(for price: Decimal) -> String {
        let number = NSDecimalNumber(decimal: price)
        return NumberFormatter.currencyWithoutCents.string(from: number) ?? "\(number)"
    }
}

private extension NumberFormatter {
    static let currencyWithoutCents: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.maximumFractionDigits = 0
        formatter.currencyCode = "INR"
        return formatter
    }()
}
