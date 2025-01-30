import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={expanded ? 'minus' : 'plus'} size={18} color="black" />
      </TouchableOpacity>
      {expanded && <View style={styles.content}><Text style={styles.contentText}>{content}</Text></View>}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  contentText: {
    fontSize: 12,
    color: '#555',
  },
});
