import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    margin: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#ccc',
    flexDirection: 'row',
    padding: 2,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
  },
  textField: {
    flex: 1,
    padding: 5,
  },
  searchButton: {
    paddingTop: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  historyContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  historyBreadcrumbs: {
    flexDirection: 'row',
  },
  historyText: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },

  resultContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});


export default styles;
