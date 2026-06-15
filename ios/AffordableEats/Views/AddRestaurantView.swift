import SwiftUI

struct AddRestaurantView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: RestaurantStore

    @State private var name = ""
    @State private var address = ""
    @State private var cuisine = ""
    @State private var averageMealPrice = "1000"
    @State private var latitude = "37.7875"
    @State private var longitude = "-122.4040"
    @State private var menuText = "Paneer Roll - ₹650\nVeg Thali - ₹950"
    @State private var notes = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Restaurant details") {
                    TextField("Name", text: $name)
                    TextField("Address", text: $address)
                    TextField("Cuisine", text: $cuisine)
                    TextField("Average meal price", text: $averageMealPrice)
                        .keyboardType(.decimalPad)
                }

                Section("Map location") {
                    TextField("Latitude", text: $latitude)
                        .keyboardType(.decimalPad)
                    TextField("Longitude", text: $longitude)
                        .keyboardType(.decimalPad)
                }

                Section("Uploaded menu text") {
                    TextEditor(text: $menuText)
                        .frame(minHeight: 140)
                    Text("Prototype format: one item per line, such as ‘Burger - ₹800’. OCR or PDF parsing can populate this text in a production build.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Section("Notes") {
                    TextField("Offers, service charge, best value items", text: $notes, axis: .vertical)
                }
            }
            .navigationTitle("Add Restaurant")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") { saveRestaurant() }
                        .disabled(!canSave)
                }
            }
        }
    }

    private var canSave: Bool {
        !name.isEmpty
            && Decimal(string: averageMealPrice) != nil
            && Double(latitude) != nil
            && Double(longitude) != nil
    }

    private func saveRestaurant() {
        store.addRestaurant(
            name: name,
            address: address,
            cuisine: cuisine,
            averageMealPrice: Decimal(string: averageMealPrice) ?? 0,
            latitude: Double(latitude) ?? 0,
            longitude: Double(longitude) ?? 0,
            menuItems: store.parseMenuText(menuText),
            notes: notes
        )
        dismiss()
    }
}
