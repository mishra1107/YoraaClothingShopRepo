// src/components/AccordionItem.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.accordionContainer}>
      {/* Accordion Header */}
      <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Icon name={expanded ? 'minus' : 'plus'} size={18} color="#000" />
      </TouchableOpacity>

      {/* Expandable Content */}
      {expanded && <Text style={styles.accordionContent}>{content}</Text>}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  accordionContainer: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  accordionContent: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
